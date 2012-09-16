class Todo < ActiveRecord::Base

	JSON_OPTIONS = { 
		:methods => [:to_param, :comments_count, :status, :groupinfo],
		:except => [:todo_group_id],
		:include => [:todo_statuses => TodoStatus::JSON_OPTIONS]
	}


	belongs_to :todo_group, :foreign_key => :group_id

	has_many :comments, :as => :commentable
	has_many :todo_statuses, :foreign_key => :todo_id, :dependent => :destroy

	default_scope order("sortorder asc")

	before_create :create_status

	def to_param
		"#{id}-#{title.parameterize}"
	end	


	def status
		self.todo_statuses.last
	end
	def group
		self.todo_group
	end
	
	def comments_count
		self.comments.count
	end

	def groupinfo 
		{
			:id => self.todo_group.id,
			:title => self.todo_group.title,
			:to_param => self.todo_group.to_param
		}
	end


	def as_json(options = {})

		super options.merge(
			JSON_OPTIONS
		)

	end

	private
	def create_status

		status = self.todo_statuses.new
		status.completed = false
		status.in_progress = false
		status.save

	end

end
