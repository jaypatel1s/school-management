# frozen_string_literal: true

# :nodoc:
devise_scope :user do
  authenticated :user do
    root to: 'dashboard#index', as: :authenticated_user
  end
end
resources :users, param: :slug
resources :subjects, param: :slug
resources :classrooms, param: :slug
