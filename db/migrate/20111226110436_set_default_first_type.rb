class SetDefaultFirstType < ActiveRecord::Migration
  def self.up
    change_column_default :games, :first_type, Game::MOVE_TO_FRONT
  end

  def self.down
    raise ActiveRecord::IrreversibleMigration, "Can't remove the default"
  end
end
