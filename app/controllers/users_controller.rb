class UsersController < ApplicationController
 
  # No login needed for signup!
  skip_before_filter :require_login  #, :only => ["new", "create", "email_unique"]


  # GET /users
  # GET /users.json
  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.includes(:contact).find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
  end

  # GET /signup  
  def new

    # set default countries
    @defaultCountries = %w(NL BE)
    @defaultCountry = "NL"

    # Get genres
    @genres = Genres.all

    respond_to do |format|
      format.html { render 'signup' }
      format.json { render json: @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /signup
  # POST /users.json
  def create
    
    # validate input
    if (!params[:contact])
      render :json => { :error => "incorrect_input"}, :status => :bad_request
      return
    end

    # Create the contact information
    contact = Contact.new(
      :firstname => params[:contact][:firstname],
      :lastname => params[:contact][:lastname],
      :country_code => params[:contact][:country_code]
    )

    # Create band
    band = Band.new(
      :bandname => params[:band][:bandname],
      :country_code => params[:band][:country_code],
      :state_code => params[:band][:state_code]
    )
    
    # Create user
    user = User.new(
      :contact => contact,
      :bands => [band],
      :email => params[:user][:email],
      :password => params[:user][:password],
      :preferred_locale => params[:user][:preferred_locale]
    )

    # Save the user
    if user.save
      render :json => user, status: :created
    else
      render :json => user.errors, status: :unprocessable_entity
    end

  end

  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end

  # Validate that email address is free
  def email_unique
    
    result = {
      :valid => false,
      :message => "",
      :error => {}
    }

    if User.includes(:contact).where(:email => params[:value]).count == 0
      result[:valid] = true;      
    else
      result[:valid] = false;
      result[:message] = "emailnotfree"
    end

    render :json => result

  end


end
