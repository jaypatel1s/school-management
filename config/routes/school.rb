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
      get :profile_setup
      post :update_profile
    end
  end
  resources :departments, param: :slug do
    resources :courses, param: :slug do
      resources :fees, param: :slug
    end
  end
  resources :fee_types, param: :slug
end
