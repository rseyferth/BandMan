class TodoGroup < ActiveRecord::Base

	belongs_to :band
	has_many :todos, :dependent => :destroy, :foreign_key => :group_id

	def to_param
		"#{id}-#{title.parameterize}"
	end

	def as_json(options = {})

		super options.merge(
			:include => [:todos => Todo::JSON_OPTIONS],
			:methods => [:to_param]
		)

	end

end
