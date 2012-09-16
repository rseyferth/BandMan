class AddFieldsToBands < ActiveRecord::Migration
  def change

  	add_column :bands, :country_code, :string
  	add_column :bands, :state_code, :string
  	  	

  end
end
