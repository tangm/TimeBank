require 'spec_helper'

describe "GameSessions" do
  
  describe "create new game" do
    it "should be successful with defaults" do
      lambda do
        visit '/'
        click_button "Create new game"

        page.should have_content("Entering player details")
        Game.first.should_not be_nil
        Game.first.should have_same_attributes_as Factory(:game)

      end.should change(Game, :count)
    end
    it "should be successful" do
      lambda do
        visit '/'
        fill_in "game_name", :with => "Imperial"
        fill_in "Number of players", :with => "5"
        click_button "Create new game"

        page.should have_content("Entering player details")

        Game.first.should_not be_nil
        Game.first.should have_same_attributes_as Factory(:game, { :name => "Imperial", :number_of_players => 5 })
      end.should change(Game, :count)
    end
    it "should require validation" do
      lambda do
        visit '/'
        fill_in "game_name", :with => "Imperial"
        fill_in "Number of players", :with => "abc"
        click_button "Create new game"

        page.should_not have_content("Entering player details")
      end.should_not change(Game, :count)
    end
  end
end
