class AddColumnsToContact < ActiveRecord::Migration
  def up

  	add_column :contacts, :country_code, :string, :default => ""
  	add_column :contacts, :state_code, :string, :default => ""

  end
  def down

  	remove_column :contacts, :country_code
  	remove_column :contacts, :state_code

  end

end
