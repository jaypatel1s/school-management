class CreateDocumentTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :document_types do |t|
      t.references :college, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.boolean :required

      t.timestamps
    end
    add_index :document_types, [:name, :college_id], unique: true
  end
end
