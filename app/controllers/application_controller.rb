class ApplicationController < ActionController::Base
	protect_from_forgery
	force_ssl

	before_filter :require_login


	private
	def require_login
		if current_user && current_band
			User.current = current_user
		else
			flash[:error] = "You must be logged in to access this."
			redirect_to login_path
		end
	end

	private 
	def logged_in?
		!!current_user
	end

	private 
	def current_user
		@current_user ||= User.find(session[:user_id]) if session[:user_id]		
	end
	def current_band

		# If we're using a /:band_id/... path, we'll try to find the band by that id, otherwise by session
		if params[:band_id]
			begin 
				# Find band
				@current_band ||= current_user.bands.find(params[:band_id])

				# Store this in session
				session[:band_id] = params[:band_id]
			rescue 
				
				# 404!
				raise ActionController::RoutingError.new("Not Found")

			end

		else
			@current_band ||= current_user.bands.find(session[:band_id]) if session[:band_id]
		end
	end
	helper_method :current_user
	helper_method :current_band

end
