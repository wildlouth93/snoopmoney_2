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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_15_041634) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "holdings", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "ticker", null: false
    t.integer "num_shares", null: false
    t.float "cost_basis", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.float "account_balance", default: 10000.0, null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "watch_list_items", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "ticker", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
