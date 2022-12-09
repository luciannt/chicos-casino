class AddStandToPlayer < ActiveRecord::Migration[7.0]
  def change
    add_column :players, :stand, :boolean
  end
end
