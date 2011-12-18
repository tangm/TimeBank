class CreateGames < ActiveRecord::Migration
  def self.up
    create_table :games do |t|
      t.time :time_per_turn
      t.time :timebank_per_player
      t.time :game_time
      t.integer :turn_number
      t.integer :round_number
      t.time :interlude_per_turn
      t.string :name

      t.timestamps
    end
  end

  def self.down
    drop_table :games
  end
end
