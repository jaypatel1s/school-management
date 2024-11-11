devise_for :users, path: '', path_names: {
  sign_in: 'signin', sign_out: 'logout'
}, controllers: {
  sessions: 'users/sessions', passwords: 'users/passwords',
  confirmations: 'users/confirmations'
}
devise_for :admin_users, ActiveAdmin::Devise.config
ActiveAdmin.routes(self)
