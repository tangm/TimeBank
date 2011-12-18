class Game < ActiveRecord::Base
   has_many :players, :through => :game_sessions
end
