class Product < ApplicationRecord
 has_many :user_items
 has_many :users, through: :user_items


  belongs_to :category
  has_many :reviews, -> { order(created_at: :desc) }
end
