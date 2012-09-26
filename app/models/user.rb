class User < ActiveRecord::Base

	# Json Parsing
	JSON_OPTIONS = { 
		:except => [:password_digest, :activated_at, :activation_code, :lastlogin_at, :preferred_locale, :updated_at, :created_at, :avatar_content_type, :avatar_file_name, :avatar_file_size, :avatar_updated_at],
		:methods => [:fullname, :avatar_thumb]
	}

	# Public static accessor to get current user
	cattr_accessor :current, :instance_accessor => false
	
	# Relationships
	belongs_to :contact, dependent: :destroy
	accepts_nested_attributes_for :contact

	has_many :band_memberships, :foreign_key => :user_id
	has_many :bands, :through => :band_memberships

	has_many :todos, :foreign_key => :created_by
	has_many :todo_statuses

	attr_accessible :email, :password, :password_confirmation, :preferred_locale, :date_lastlogon, :contact_attributes, :contact, :bands, :avatar

	# Avatar image
	has_attached_file :avatar, :styles => { :medium => ["300x300>", :png], :thumb => ["50x50>", :png] }
	
	# Authentication
	has_secure_password

	# Validation
	validates :email, presence: true, uniqueness: true
	#validates :password, presence: true

	# Filters
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

	def avatar_thumb
		self.avatar.url(:thumb)
	end

	def avatar_medium
		self.avatar.url(:medium)
	end

	
  	private
  	def copy_email_to_contact
  		self.contact.email = self.email
  	end

  	def as_json(options = {})
		super options.merge(JSON_OPTIONS)
	end
  


end
