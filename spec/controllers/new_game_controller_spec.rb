require 'spec_helper'

describe NewGameController do
  render_views

  describe "GET 'index'" do

    it "should be successful" do
      get :index
      response.should be_success
    end

    it "should create a new game" do
      get :index
      assigns(:game).should_not be_nil
    end
    
  end
end
