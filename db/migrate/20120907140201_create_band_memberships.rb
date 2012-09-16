class CreateBandMemberships < ActiveRecord::Migration
  def change
    create_table :band_memberships do |t|
      t.boolean :administrator

      t.references :user
      t.references :band

      t.timestamps
    end

    add_index :band_memberships, [:user_id, :band_id]


  end
end
