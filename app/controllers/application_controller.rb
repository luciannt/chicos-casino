class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  def hello_world
    session[:count] = (session[:count] || 0) + 1
    render json: { count: session[:count] }
  end

  def create
    user = User.find_by(username: params[:username])
    session[:user_id] = user.id
    render json: user
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else
      render json: { error: "Unauthorized user" }, status: :unauthorized
    end
  end

  private

  def record_not_found
    render json: { error: "#{object.model} not found" }, status: 404
  end

  def record_invalid
    rendr json: { errors: invalid.record.errors }, status: :unprocessable_entity
  end
end
