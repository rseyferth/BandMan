class CreateTodoGroups < ActiveRecord::Migration
  def change
    create_table :todo_groups do |t|
      t.references :band
      t.references :created_by, :class_name => "User"
      t.string :title
      t.string :description
      t.integer :sortorder

      t.timestamps
    end
  end
end
