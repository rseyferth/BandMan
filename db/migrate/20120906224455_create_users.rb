class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :preferred_locale
      t.datetime :date_lastlogon
      t.references :contact

      t.timestamps
    end

    create_table :contacts do |t|
      t.string :firstname
      t.string :lastname
      t.string :email

      t.timestamps
    end


    add_index :users, :contact_id

  end
end
