class User < ApplicationRecord
  has_secure_password

  has_many :reviews
  has_many :products, through: :reviews


  has_many :user_items
  has_many :products, through: :user_items

  validates :username, presence: true, uniqueness: true
end
