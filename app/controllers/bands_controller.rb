class BandsController < ApplicationController

	# GET /:band_id
	# Should render the dashboard.
	def show

		# Now render :)
		respond_to do |format|
	    	format.html { render "bands/dashboard" }
			format.json { render json: @band }
	    end


	end

end
