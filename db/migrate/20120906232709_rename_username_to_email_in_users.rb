class RenameUsernameToEmailInUsers < ActiveRecord::Migration
  def up
  	rename_column :users, :username, :email

  	add_index :users, :email, :unique => true

  end

  def down
  	
	remove_index :users, :email

  	rename_column :users, :username, :email


  end
end
