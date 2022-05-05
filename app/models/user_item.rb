class UserItem < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :product,
            uniqueness: {
              scope: :user_id,
              message: 'Only one bot per customer!',
            }
end
