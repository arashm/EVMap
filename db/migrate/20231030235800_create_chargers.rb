class CreateChargers < ActiveRecord::Migration[7.1]
  def change
    create_table :chargers do |t|
      t.float :lat
      t.float :lng
      t.string :country
      t.integer :connections_count
      t.boolean :is_operational

      t.timestamps
    end
  end
end
