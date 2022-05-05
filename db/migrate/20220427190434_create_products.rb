class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :title
      t.string :description
      t.references :category
      t.integer :price
      t.integer :quantity
      t.string :image
    end
  end
end
