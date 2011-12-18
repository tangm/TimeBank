class CreateGameSessions < ActiveRecord::Migration
  def self.up
    create_table :game_sessions do |t|
      t.integer :player_i
      t.integer :game_id
      t.integer :turn_number
      t.integer :round_number
      t.time :turn_time
      t.time :time_bank
      t.time :time_taken_so_far
      t.integer :turn_order

      t.timestamps
    end
  end

  def self.down
    drop_table :game_sessions
  end
end
