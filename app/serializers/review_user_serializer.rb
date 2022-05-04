class ReviewUserSerializer < ActiveModel::Serializer
  attributes :id,
             :description,
             :rating,
             :user_id,
             :product_id,
             :created_at,
             :updated_at
  belongs_to :user
end
