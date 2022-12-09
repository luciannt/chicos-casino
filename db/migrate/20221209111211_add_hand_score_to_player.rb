class AddHandScoreToPlayer < ActiveRecord::Migration[7.0]
  def change
    add_column :players, :hand_score, :integer
  end
end
