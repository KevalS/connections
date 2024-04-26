# frozen_string_literal: true

class CreateNotifications < ActiveRecord::Migration[7.1]
  def change
    create_table :notifications do |t|
      t.references :recipient, foreign_key: { to_table: :users }
      t.references :actor, foreign_key: { to_table: :users }
      t.string :action
      t.boolean :read, default: false
      t.references :notifiable, polymorphic: true

      t.timestamps
    end
  end
end
