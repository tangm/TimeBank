class Game < ActiveRecord::Base
   has_many :players, :through => :game_sessions

  validates :number_of_players, :presence => true,  :on => :create,
    :numericality => { :only_integer => true,:greater_than => 0 }
  validates :name, :presence => true, :on => :create
end
