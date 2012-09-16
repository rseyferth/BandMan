class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.references :group, :class => "TodoGroup"
      t.string :title
      t.datetime :due_at
      t.integer :sortorder
      t.references :created_by, :class => "User"

      t.timestamps
    end
  end
end
