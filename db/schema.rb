# encoding: UTF-8
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

ActiveRecord::Schema.define(:version => 20120926123732) do

  create_table "band_genres", :force => true do |t|
    t.integer  "band_id"
    t.integer  "genre_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "band_genres", ["band_id", "genre_id"], :name => "index_band_genres_on_band_id_and_genre_id"

  create_table "band_memberships", :force => true do |t|
    t.boolean  "administrator"
    t.integer  "user_id"
    t.integer  "band_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "band_memberships", ["user_id", "band_id"], :name => "index_band_memberships_on_user_id_and_band_id"

  create_table "bands", :force => true do |t|
    t.string   "bandname"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.string   "country_code"
    t.string   "state_code"
  end

  create_table "comments", :force => true do |t|
    t.integer  "user_id"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.string   "message"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "contacts", :force => true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "email"
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
    t.string   "country_code", :default => ""
    t.string   "state_code",   :default => ""
  end

  create_table "entities", :force => true do |t|
    t.integer  "band_id"
    t.integer  "entity_id"
    t.string   "entity_type", :default => "User"
    t.string   "name"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
  end

  create_table "genres", :force => true do |t|
    t.string   "genre"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "todo_groups", :force => true do |t|
    t.integer  "band_id"
    t.integer  "created_by_id"
    t.string   "title"
    t.string   "description"
    t.integer  "sortorder"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "todo_statuses", :force => true do |t|
    t.integer  "todo_id"
    t.integer  "user_id"
    t.boolean  "completed"
    t.boolean  "in_progress"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "todos", :force => true do |t|
    t.integer  "group_id"
    t.string   "title"
    t.datetime "due_at"
    t.integer  "sortorder"
    t.integer  "created_by_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.string   "preferred_locale"
    t.datetime "lastlogin_at"
    t.integer  "contact_id"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.datetime "activated_at"
    t.string   "activation_code"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["contact_id"], :name => "index_users_on_contact_id"
  add_index "users", ["email"], :name => "index_users_on_email", :unique => true

end
