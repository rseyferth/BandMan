class SessionController < ApplicationController

	skip_before_filter :require_login, :only => [:new, :create]

	def new
	end	

	def create
		user = User.includes(:bands).find_by_email(params[:email])
		if (user && user.authenticate(params[:password]))

			# Store the user in a session
			session[:user_id] = user.id

			# Lookup the first band for this user
			session[:band_id] = user.bands.first.id

			# We're in!
			redirect_to user.bands.first, :notice => "Logged in!"

		else
			flash.now.alert = "Invalid email or password"
			render "new"
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to root_url, :notice => "Logged out!"
	end

end
