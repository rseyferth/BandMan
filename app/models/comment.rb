class Comment < ActiveRecord::Base

	JSON_OPTIONS = { 
		:include => [:user => User::JSON_OPTIONS ],
		:except => [:commentable_id, :commentable_type, :user_id]
	}

	belongs_to :user
	belongs_to :commentable, :polymorphic => true


	def as_json(options = {})
		super options.merge(JSON_OPTIONS)
	end

end
