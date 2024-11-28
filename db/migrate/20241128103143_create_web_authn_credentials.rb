class CreateWebAuthnCredentials < ActiveRecord::Migration[7.0]
  def change
    create_table :web_authn_credentials do |t|
      t.references :user, null: false, foreign_key: true
      t.string :external_id
      t.string :unique
      t.string :true
      t.string :public_key
      t.integer :sign_count

      t.timestamps
    end
  end
end
