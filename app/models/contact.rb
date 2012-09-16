class Contact < ActiveRecord::Base

	def fullname
		return self.firstname + " " + self.lastname
	end

end
