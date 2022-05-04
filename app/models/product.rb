class Product < ApplicationRecord
  has_many :line_items, dependent: :destroy
  belongs_to :category
  has_many :reviews, -> { order(created_at: :desc) }
end
