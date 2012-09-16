class BandGenres < ActiveRecord::Base

	belongs_to :genres
	belongs_to :bands

	
end
