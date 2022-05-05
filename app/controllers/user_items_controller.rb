class UserItemsController < ApplicationController
  # def cart
  #   cartItem =
  #     UserItem.find do |userItem|
  #       userItem.item_id === params[:item_id] &&
  #         userItem.user_id === params[:user_id]
  #     end
  #   if (cartItem)
  #     if (params[:step] == 'add')
  #       cartItem.update(quantity: cartItem.quantity += 1)
  #     elsif (params[:step] == 'subtract')
  #       cartItem.update(quantity: cartItem.quantity -= 1)
  #     end
  #     render json: cartItem
  #   else
  #     @user_item = UserItem.create(user_item_params)
  #     render json: @user_item
  #   end
  # end

  # def update
  #     @user_item = UserItem.find(params[:id])
  #     @user_item.update(user_item_params)
  #     render json: @user_item
  # end

  def show
    @user_items = @user.user_items
    render json: @user_items
  end

  def index
    # @user_item = UserItem.find(params[:id])
    # render json: @user_item
    user_items = UserItem.all
    render json: user_items
  end

  def create
    new_user_item = UserItem.create!(user_item_params)
    render json: new_user_item, status: :created
  end

  def destroy
    @user_item = UserItem.find(params[:id])
    @user_item.destroy
  end

  private

  def user_item_params
    params.permit(:user_id, :product_id)
  end
end
