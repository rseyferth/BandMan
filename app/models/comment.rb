class Comment < ActiveRecord::Base

	JSON_OPTIONS = { 
		:include => [:user => User::JSON_OPTIONS ],
		:methods => [:message_html],
		:except => [:commentable_id, :commentable_type, :user_id]
	}

	belongs_to :user
	belongs_to :commentable, :polymorphic => true

	before_create :set_current_user



	def as_json(options = {})
		super options.merge(JSON_OPTIONS)
	end

	private
	def set_current_user

		self.user = User.current

	end

end
