class CreateUserScores < ActiveRecord::Migration[7.0]
  def change
    create_table :user_scores do |t|

      t.timestamps
    end
  end
end
