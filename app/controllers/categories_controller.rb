class CategoriesController < ApplicationController
  def show
    selected_category = Category.find(params[:id])
    products = selected_category.products.order(created_at: :desc)
  end
end
