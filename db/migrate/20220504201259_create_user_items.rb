class CreateUserItems < ActiveRecord::Migration[6.1]
  def change
    create_table :user_items do |t|
      t.references :user
      t.references :product

      t.timestamps
    end
  end
end
