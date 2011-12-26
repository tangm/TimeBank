class NewGameController < ApplicationController

  def index
    @game = Game.new
    @first_type_descriptions = Game::DESCRIPTIONS.invert
  end
  
  def create_game
    @game = Game.new(params[:game])
    
    if @game.save
      redirect_to :action => "new_players",:game_id => @game.id, :number_of_players => params[:number_of_players]
    else
      redirect_to :action => "index"
    end
  end

  def new_players
    @game = Game.find(params[:game_id])
    @players = Array.new
    @game.number_of_players.times do |i|
      @players[i] = Player.new
    end
  end

  def create_game_sessions
    @game = Game.find(params[:game_id])
    
    @players = Array.new
    @game_sessions = Array.new

    @game.number_of_players.times do |i|
      @players[i] = Player.new(params[:players][i.to_s])
      @players[i].save
      
      @game_sessions[i] = GameSession.new(:game => @game,:player => @players[i],
        :turn_time =>@game.time_per_turn,:time_bank => @game.timebank_per_player,
        :time_taken_so_far => "00:00:00",:turn_order=> i)
      @game_sessions[i].save
    end

    redirect_to :controller => :timer, :action => :index,:game_id => @game.id
  end
end
