devise_for :users, path: '', path_names: {
  sign_in: 'signin', sign_out: 'logout'
}, controllers: {
  sessions: 'users/sessions', passwords: 'users/passwords',
  confirmations: 'users/confirmations'
}
devise_scope :user do
  get 'webauthn_login', to: 'users/sessions#webauthn_login'
  post 'verify_webauthn_login', to: 'users/sessions#verify_webauthn_login'
end

devise_for :admin_users, ActiveAdmin::Devise.config
ActiveAdmin.routes(self)
