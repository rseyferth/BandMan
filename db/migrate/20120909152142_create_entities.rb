class CreateEntities < ActiveRecord::Migration
  def change
    create_table :entities do |t|

      t.references :band
      t.references :entity, :polymorphic => { :default => "User" }
      t.string :name

      t.timestamps
    end
  end
end
