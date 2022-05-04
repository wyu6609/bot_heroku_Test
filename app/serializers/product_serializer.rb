class ProductSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :quantity, :image

  has_one :category
end
