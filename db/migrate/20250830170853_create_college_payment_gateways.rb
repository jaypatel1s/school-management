class CreateCollegePaymentGateways < ActiveRecord::Migration[7.1]
  def change
    create_table :college_payment_gateways do |t|
      t.references :college, null: false, foreign_key: true
      t.string :name, null: false
      t.string :api_key
      t.string :api_secret
      t.string :merchant_id
      t.jsonb :options, default: {}
      t.boolean :active, default: true
      t.string :slug, limit: 255, null: false
      t.timestamps
    end

    add_index :college_payment_gateways, [:college_id, :name], unique: true
    change_column :students, :roll_number, :string
  end
end
