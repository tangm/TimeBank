class GameSessionsController < ApplicationController
  # GET /sessions
  # GET /sessions.xml
  def index
    @game_session = GameSession.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @game_session }
    end
  end

  # GET /sessions/1
  # GET /sessions/1.xml
  def show
    @game_session = GameSession.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @game_session }
    end
  end

  # GET /sessions/new
  # GET /sessions/new.xml
  def new
    @game_session = GameSession.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @game_session }
    end
  end

  # GET /sessions/1/edit
  def edit
    @game_session = GameSession.find(params[:id])
  end

  # POST /sessions
  # POST /sessions.xml
  def create
    @game_session = GameSession.new(params[:game_session])

    respond_to do |format|
      if @game_session.save
        format.html { redirect_to(@game_session, :notice => 'Session was successfully created.') }
        format.xml  { render :xml => @game_session, :status => :created, :location => @game_session }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @game_session.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /sessions/1
  # PUT /sessions/1.xml
  def update
    @game_session = GameSession.find(params[:id])

    respond_to do |format|
      if @game_session.update_attributes(params[:game_session])
        format.html { redirect_to(@game_session, :notice => 'Session was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @game_session.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /sessions/1
  # DELETE /sessions/1.xml
  def destroy
    @game_session = GameSession.find(params[:id])
    @game_session.destroy

    respond_to do |format|
      format.html { redirect_to(sessions_url) }
      format.xml  { head :ok }
    end
  end
end
