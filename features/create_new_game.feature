Feature: Player starts game

  As a Player
  I want to start a game
  So that I can time my friends

  Scenario:
    Given I am not yet playing
    When I start a new game
    Then I should see "Entering player details"
    And I should see "Player #1 name"
