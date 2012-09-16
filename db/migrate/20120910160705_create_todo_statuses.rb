class CreateTodoStatuses < ActiveRecord::Migration
  def change
    create_table :todo_statuses do |t|
      
    	t.references :todo
    	t.references :user
    	
    	t.boolean :completed
    	t.boolean :in_progress

    	t.timestamps
    end
  end
end
