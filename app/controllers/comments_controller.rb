class CommentsController < ApplicationController

	before_filter :find_commentable

	# GET /:band_id/todos/:todo_group_id/todos
	def index

		# Now render :)
		respond_to do |format|
			format.js { render :js, :partial => "comments/js/comments", :content_type => "text/javascript" }
	    	format.html { render "comments/index" }
			format.json { render json: @commentable.comments }
	    end


	end

	private
	def find_commentable

		if params[:todo_id]
			@commentable = Todo.find(params[:todo_id])
		else
			# Didn't know that one...
		end

	end

end
