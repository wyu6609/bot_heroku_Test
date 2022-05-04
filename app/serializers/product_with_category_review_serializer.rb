class ProductWithCategoryReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :quantity, :image

  has_many :reviews, serializer: ReviewUserSerializer
  has_one :category
end
