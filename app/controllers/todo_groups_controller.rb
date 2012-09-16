class TodoGroupsController < ApplicationController
  

  # GET /todo_groups
  # GET /todo_groups.json
  def index
    
    @todo_groups = @current_band.todo_groups.all

    respond_to do |format|
      format.js { render :js, :partial => "todo_groups/js/todos", :content_type => "text/javascript" }
      format.html { render "todo_groups/index" } # index.html.erb
      format.json { render json: @todo_groups }
    end

  end

  # GET /todo_groups/1
  # GET /todo_groups/1.json
  def show
    @todo_group = TodoGroup.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @todo_group }
    end
  end

  # GET /todo_groups/new
  # GET /todo_groups/new.json
  def new
    @todo_group = TodoGroup.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @todo_group }
    end
  end

  # GET /todo_groups/1/edit
  def edit
    @todo_group = TodoGroup.find(params[:id])
  end

  # POST /todo_groups
  # POST /todo_groups.json
  def create
    @todo_group = TodoGroup.new(params[:todo_group])

    respond_to do |format|
      if @todo_group.save
        format.json { render json: @todo_group, status: :created }
      else
        format.json { render json: @todo_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /todo_groups/1
  # PUT /todo_groups/1.json
  def update
    @todo_group = TodoGroup.find(params[:id])

    respond_to do |format|
      if @todo_group.update_attributes(params[:todo_group])
        format.html { redirect_to @todo_group, notice: 'Todo group was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @todo_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /todo_groups/1
  # DELETE /todo_groups/1.json
  def destroy
    @todo_group = TodoGroup.find(params[:id])
    @todo_group.destroy

    respond_to do |format|
      format.html { redirect_to todo_groups_url }
      format.json { head :no_content }
    end
  end



end
