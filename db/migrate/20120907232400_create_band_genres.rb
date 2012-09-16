class CreateBandGenres < ActiveRecord::Migration
  def change
    create_table :band_genres do |t|

    	t.references :band
    	t.references :genre

     	t.timestamps
    end

    add_index :band_genres, [:band_id, :genre_id]

  end
end
