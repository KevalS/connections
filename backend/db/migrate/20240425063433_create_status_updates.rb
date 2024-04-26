# frozen_string_literal: true

class CreateStatusUpdates < ActiveRecord::Migration[7.1]
  def change
    create_table :status_updates do |t|
      t.references :user, null: false, foreign_key: true
      t.text :context

      t.timestamps
    end
  end
end
