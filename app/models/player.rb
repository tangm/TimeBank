class Player < ActiveRecord::Base
  has_many :games, :through => :game_sessions

  validates :name, :presence => true, :on => :create
end
