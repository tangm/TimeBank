class NewGameController < ApplicationController

  def index
    @game = Game.new(params[:game])

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @game }
    end
  end
end
