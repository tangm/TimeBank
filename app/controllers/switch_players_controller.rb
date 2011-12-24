class SwitchPlayersController < ApplicationController

  def index
    @game = Game.find(params[:game_id])
    @game_sessions = GameSession.where(:game_id => params[:game_id]).order :turn_order
  end

  def change
    @game = Game.find(params[:game_id])
    @game_sessions = GameSession.where(:game_id => params[:game_id])

    @game.number_of_players.times do |i|
      turn_order = @game_sessions[i].turn_order

      @game_sessions[i].turn_order = ((params["player_new_turn_order_"+(turn_order+1).to_s][(turn_order+1).to_s]).to_i-1)
      @game_sessions[i].save
    end
    redirect_to :controller=>:timer,:game_id => @game.id
  end
end
