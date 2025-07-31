# FROM node:18
# WORKDIR /app
# COPY . .
# RUN npm install
# EXPOSE 4000
# CMD ["node", "index.js"]
# Use Node 20 for consistency with your local version
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present) first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose port your app uses
EXPOSE 4000

# Start your Node.js app
CMD ["node", "index.js"]

