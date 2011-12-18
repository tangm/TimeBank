class TimerController < ApplicationController

  def index
    @game = Game.find(params[:game_id])
    @game_sessions = GameSession.where(:game_id => params[:game_id])
    #@players = @game_sessions.players
  end
end
