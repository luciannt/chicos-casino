class CreateTables < ActiveRecord::Migration[5.0]
  def change
    create_table :tables do |t|
      t.json :shoe_data
      t.json :dealer_hand_data

      t.timestamps
    end
  end
end
