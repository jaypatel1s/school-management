ActiveAdmin.register User do
  # Permitting parameters for user, excluding email and password on edit
  permit_params :college_id, :email, :profile_setup, :password_confirmation, :password, :name, :role, :contact_no, :description, :reset_password_token, :reset_password_sent_at, :remember_created_at, :sign_in_count, :current_sign_in_at, :last_sign_in_at, :current_sign_in_ip, :last_sign_in_ip, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email, :failed_attempts, :unlock_token, :locked_at

  # Use the form block to conditionally exclude email and password on edit
  form do |f|
    f.semantic_errors
    f.inputs 'User' do
      f.input :name
      f.input :college
      # Only show email and password fields if it's a new record
      if f.object.new_record?
        f.input :email
        f.input :password
        f.input :password_confirmation
      end
      f.input :role, as: :select
      f.input :confirmed_at, as: :boolean, label: "Email Confirmed?"
      f.input :profile_setup, as: :boolean, label: "Profile Setup"
    end
    f.actions
  end
end
