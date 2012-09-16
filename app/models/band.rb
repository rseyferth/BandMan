class Band < ActiveRecord::Base

	has_many :band_memberships, :foreign_key => :band_id
	has_many :users, :through => :band_memberships, :foreign_key => :band_id

	has_many :band_genres, :foreign_key => :band_id
	has_many :genres, :through => :band_genres, :foreign_key => :band_id

	has_many :todo_groups, :dependent => :destroy


	def to_param
		"#{id}-#{bandname.parameterize}"
	end

end
