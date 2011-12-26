class AddFirstTypeToGame < ActiveRecord::Migration
  def self.up
    add_column :games, :first_type, :integer
  end

  def self.down
    remove_column :games, :first_type
  end
end
