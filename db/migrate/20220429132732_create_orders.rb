class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.string :username
      t.string :stripe_charge_id

      t.integer :total_price
      t.timestamps
    end
  end
end
