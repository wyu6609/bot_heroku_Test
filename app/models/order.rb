class Order < ApplicationRecord
  belongs_to :user
  has_many :line_items, dependent: :destroy
  validates :stripe_charge_id, presence: true
  monetize :total_cents, numericality: true
end
