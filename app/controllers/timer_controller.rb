class TimerController < ApplicationController

  def index
    @game = Game.find(params[:game_id])
    @game_sessions = GameSession.where(:game_id => params[:game_id]).order :turn_order

    if params["game_time"] then
      @game.game_time = params["game_time"]
      @game.round_number = params["round_number"]
      @game.save

      @game.number_of_players.times do |i|
        turn_order = @game_sessions[i].turn_order

        @game_sessions[i].turn_time = @game.time_per_turn
        @game_sessions[i].time_bank = "00:"+params["player_time_bank_"+(turn_order+1).to_s]
        @game_sessions[i].time_taken_so_far = params["player_time_taken_so_far_"+(turn_order+1).to_s]
        @game_sessions[i].save
      end
      if params["commit"] == "Change turn order"
        redirect_to :controller=>:switch_players,:game_id => @game.id
      end

      if params["turn_number"] == "-1" #end game triggered
        @game.ended_at = Time.now
        @game.save
        
        redirect_to @game
#        redirect_to :controller=>:game,:game_id => @game.id, :number_of_players => params[:number_of_players]
      end
    end
  end

  def change_turn_order
    @game = Game.find(params[:game_id])
    @game_sessions = GameSession.where(:game_id => params[:game_id])

    @game.number_of_players.times do |i|
      turn_order = @game_sessions[i].turn_order

      @game_sessions[i].turn_order = ((params["player_new_turn_order_"+(turn_order+1).to_s].values.first).to_i-1)
      @game_sessions[i].save
    end

    @game_sessions = GameSession.where(:game_id => params[:game_id]).order :turn_order
    
    respond_to do |format|
      format.html { redirect_to :action =>:index,:game_id => params[:game_id] }
      format.js
    end
  end

end
