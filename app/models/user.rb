class User < ActiveRecord::Base

	JSON_OPTIONS = { 
		:except => [:password_digest, :activated_at, :activation_code, :lastlogin_at, :preferred_locale, :updated_at, :created_at],
		:methods => [:fullname]
	}

	cattr_accessor :current, :instance_accessor => false

	belongs_to :contact, dependent: :destroy
	accepts_nested_attributes_for :contact

	has_many :band_memberships, :foreign_key => :user_id
	has_many :bands, :through => :band_memberships

	has_many :todos, :foreign_key => :created_by
	has_many :todo_statuses

	attr_accessible :email, :password, :password_confirmation, :preferred_locale, :date_lastlogon, :contact_attributes, :contact, :bands

	has_secure_password

	validates :email, presence: true, uniqueness: true
	validates :password, presence: true

	before_save :copy_email_to_contact



	def self.current
		Thread.current[:user]
	end
	def self.current=(user)
		Thread.current[:user] = user
	end

	def fullname
		self.contact.fullname
	end


  	def as_json(options = {})
		super options.merge(JSON_OPTIONS)
	end
  
	
  	private
  	def copy_email_to_contact
  		self.contact.email = self.email
  	end


end
