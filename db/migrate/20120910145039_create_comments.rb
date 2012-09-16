class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :user
      t.references :commentable, :polymorphic => true
      t.string :message

      t.timestamps
    end
  end
end
