class AuthController < ApplicationController
  def signup
    user = User.create!(user_params)
    token = encode_token({ user_id: user.id })
    render json: { token: token }
  end

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = encode_token({ user_id: user.id })
      render json: { token: token }
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end

  def encode_token(payload)
    JWT.encode(payload, 'secret_key')
  end
end
