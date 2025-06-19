class CreateDocumentTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :document_types do |t|
      t.string :name
      t.text :description
      t.boolean :required

      t.timestamps
    end
  end
end
