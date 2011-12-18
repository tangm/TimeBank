class Player < ActiveRecord::Base
  has_many :games, :through => :game_sessions
end
