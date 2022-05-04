class ProductsController < ApplicationController
  def index
    products = Product.all.order(price: :asc)
    render json: products, include: ['category']
  end
  def show
    selected_products = Product.find(params[:id])
    render json: selected_products,
           include: %w[reviews reviews.user],
           serializer: ProductWithCategoryReviewSerializer
  end
end
