class CreateGames < ActiveRecord::Migration
  def self.up
    create_table :games do |t|
      t.time :time_per_turn, :default => "00:03:00"
      t.time :timebank_per_player, :default => "00:10:00"
      t.time :game_time, :default => "00:00:00"
      t.integer :turn_number, :default => 1
      t.integer :round_number, :default => 1
      t.time :interlude_per_turn, :default => "00:00:03"
      t.string :name

      t.timestamps
    end
  end

  def self.down
    drop_table :games
  end
end
