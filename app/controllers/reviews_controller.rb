class ReviewsController < ApplicationController
  def index
    render json: Review.all
  end

  def show
    selected_review = Review.find(params[:id])
    render json: selected_review
  end
  def create
    new_review = Review.create!(review_params)
    render json: new_review, status: :created
  end

  def destroy
    selected_review = Review.find(params[:id])
    selected_review.destroy
    render json: selected_review
    # head :no_content
  end

  private

  def review_params
    params.permit(:rating, :description, :user_id, :product_id)
  end
end
