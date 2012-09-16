class RenameLastLoginForUsers < ActiveRecord::Migration
  def up
  	rename_column :users, :date_lastlogon, :lastlogin_at
  end

  def down
  	rename_column :users, :lastlogin_at, :date_lastlogon
  end
end
