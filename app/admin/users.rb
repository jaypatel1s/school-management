ActiveAdmin.register User do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :college_id, :email, :password_confirmation, :password, :name, :role, :contact_no, :description, :reset_password_token, :reset_password_sent_at, :remember_created_at, :sign_in_count, :current_sign_in_at, :last_sign_in_at, :current_sign_in_ip, :last_sign_in_ip, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email, :failed_attempts, :unlock_token, :locked_at
  #
  # or
  #
  # permit_params do
  #   permitted = [:college_id, :email, :encrypted_password, :name, :role, :contact_no, :description, :reset_password_token, :reset_password_sent_at, :remember_created_at, :sign_in_count, :current_sign_in_at, :last_sign_in_at, :current_sign_in_ip, :last_sign_in_ip, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email, :failed_attempts, :unlock_token, :locked_at]
  #   permitted << :other if params[:action] == 'create' && current_user.principal?
  #   permitted
  # end
  form do |f|
    f.semantic_errors
    f.inputs 'User' do
      f.input :name
      f.input :college
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :role, as: :select
      f.input :confirmed_at, as: :boolean, label: "Email Confirmed?"
    end
    f.actions
  end
end
