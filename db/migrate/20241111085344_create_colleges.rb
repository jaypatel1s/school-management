class CreateColleges < ActiveRecord::Migration[7.0]
  def change
    create_table :colleges do |t|
      t.string :name
      t.text :address
      t.text :landmark
      t.string :pincode
      t.string :state
      t.string :city
      t.string :country
      t.string :slug, limit: 255, null: false

      t.timestamps
    end
  end
end
