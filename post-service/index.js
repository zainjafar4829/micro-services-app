const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// MongoDB setup
mongoose.connect("mongodb://localhost:27017/postsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const postSchema = new mongoose.Schema({
  user: String,
  text: String,
});
const Post = mongoose.model("Post", postSchema);

// Middleware
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, "secret_key");
    next();
  } catch {
    res.sendStatus(403);
  }
};

// Routes
app.post("/posts", authenticate, async (req, res) => {
  const post = new Post({ user: req.user.user_id, text: req.body.text });
  await post.save();
  res.json({ status: "success", message: "Post saved", data: post });
});

app.get("/posts", authenticate, async (req, res) => {
  const posts = await Post.find({ user: req.user.user_id });
  res.json({
    status: "success",
    message: "Posts retrieved successfully",
    data: posts,
  });
});

app.listen(PORT, () => {
  console.log(`Post service running at http://localhost:${PORT}`);
});
