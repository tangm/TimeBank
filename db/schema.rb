# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20111226110436) do

  create_table "game_sessions", :force => true do |t|
    t.integer  "player_id"
    t.integer  "game_id"
    t.integer  "turn_number"
    t.integer  "round_number"
    t.time     "turn_time"
    t.time     "time_bank"
    t.time     "time_taken_so_far"
    t.integer  "turn_order"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "games", :force => true do |t|
    t.time     "time_per_turn",       :default => '2000-01-01 00:03:00'
    t.time     "timebank_per_player", :default => '2000-01-01 00:10:00'
    t.time     "game_time",           :default => '2000-01-01 00:00:00'
    t.integer  "turn_number",         :default => 0
    t.integer  "round_number",        :default => 0
    t.time     "interlude_per_turn",  :default => '2000-01-01 00:00:03'
    t.integer  "number_of_players"
    t.string   "name"
    t.datetime "ended_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "first_type",          :default => 0
  end

  create_table "players", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "colour"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
