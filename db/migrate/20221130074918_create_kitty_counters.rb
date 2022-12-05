class CreateKittyCounters < ActiveRecord::Migration[7.0]
  def change
    create_table :kitty_counters do |t|

      t.timestamps
    end
  end
end
