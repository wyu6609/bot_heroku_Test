class ShoppingCart < ApplicationRecord
  has_many :line_items, dependent: :destroy
  has_many :products, through: :line_items
  belongs_to :user

  # LOGIC
  def sub_total
    sum = 0
    self.line_items.each { |line_item| sum += line_item.total_price }
    return sum
  end
end
