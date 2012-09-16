class TodoStatus < ActiveRecord::Base

	JSON_OPTIONS = {
		:except => [:todo_id, :updated_at],
		:include => [:user => User::JSON_OPTIONS]
	}

	belongs_to :todo
	belongs_to :user

	before_create :add_user

	default_scope order("created_at ASC")


	def as_json(options = {})

		super options.merge(JSON_OPTIONS)

	end

	private
	def add_user		
		self.user = User.current
	end

	

end