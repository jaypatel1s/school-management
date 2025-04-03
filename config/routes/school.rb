# frozen_string_literal: true

# :nodoc:
devise_scope :user do
  authenticated :user do
    root to: 'dashboard#index', as: :authenticated_user
  end
end

resources :colleges, param: :slug do
  resources :users, param: :slug do
    member do
      get :new_webauthn_registration
      post :create_webauthn_registration
      get :profile_setup
      post :update_profile
    end
  end
  resources :departments, param: :slug
  resources :courses, param: :slug
  resources :sessions, param: :slug do
    member do
      get 'qr_code'  # For displaying the QR code
      get 'report'   # For downloading attendance report
    end
    resources :attendances, param: :slug, only: [:index, :new, :create] do
      collection do
        get 'mark'
      end
    end
  end
  resources :fees, param: :slug
  resources :fee_types, param: :slug
end
