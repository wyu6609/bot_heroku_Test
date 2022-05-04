class Review < ApplicationRecord
  belongs_to :product
  belongs_to :user

  validates_presence_of :product_id, :user_id, :description, :rating
  validates :product_id,
            uniqueness: {
              scope: :user_id,
              message: "You've reviewed this bot!",
            }
end
