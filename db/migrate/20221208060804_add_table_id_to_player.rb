class AddTableIdToPlayer < ActiveRecord::Migration[7.0]
  def change
    add_column :players, :table_id, :integer
  end
end
