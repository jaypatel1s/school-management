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
    resources :teacher_subjects
  end
  resources :subjects, param: :slug do
    resources :classrooms, param: :slug do
      resources :sessions, param: :slug do
        resources :attendances, param: :slug, only: [:index, :update]
      end
    end
  end
end
