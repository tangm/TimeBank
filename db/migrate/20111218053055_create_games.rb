class CreateGames < ActiveRecord::Migration
  def self.up
    create_table :games do |t|
      t.time :time_per_turn, :default => "00:03:00"
      t.time :timebank_per_player, :default => "00:10:00"
      t.time :game_time, :default => "00:00:00"
      t.integer :turn_number, :default => 1
      t.integer :round_number, :default => 0
      t.time :interlude_per_turn, :default => "00:00:03"
      t.integer :number_of_players
      t.string :name
      t.datetime :ended_at, :default => nil

      t.timestamps
    end
  end

  def self.down
    drop_table :games
  end
end
