class UserItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :product_id
end
