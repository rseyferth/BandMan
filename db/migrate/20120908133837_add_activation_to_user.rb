class AddActivationToUser < ActiveRecord::Migration
  def change

  	add_column :users, :activated_at, :datetime
  	add_column :users, :activation_code, :string

  end
end
