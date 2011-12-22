class GameSession < ActiveRecord::Base
  belongs_to :game
  belongs_to :player

  validates_associated :game, :player
end
