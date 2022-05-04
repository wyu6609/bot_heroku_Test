class CreateLineItems < ActiveRecord::Migration[6.1]
  def change
    create_table :line_items do |t|
      t.integer :quantity
      t.integer :item_price
      t.integer :total_price
      t.references :product
      t.references :order
      t.timestamps
    end
  end
end
