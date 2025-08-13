# frozen_string_literal: true

# :nodoc:
devise_scope :user do
  authenticated :user do
    root to: 'dashboard#index', as: :authenticated_user
  end
  unauthenticated :user do
    root to: 'users/sessions#new'
  end
end
resources :public_admissions, param: :slug do
  collection do
    get :departments
    get :courses
  end
  member do
    post :upload_document
    post :validate_token
    delete :remove_document
    post :regenerate_token
  end
end

namespace :super_admins do
  resources :admissions, param: :slug
end

resources :colleges, param: :slug do
  get  'setup', to: 'setup#setup'
  post 'setup', to: 'setup#create'
  get 'setup/department_courses/:department_id', to: 'setup#department_courses', as: :college_department_courses

  namespace :principals do
    resources :dashboard, only: [:index]
    resources :users, param: :slug do
      collection do
        post :import_users
      end
    end
    resources :departments, param: :slug
    resources :courses, param: :slug
    resources :sessions, param: :slug do
      resources :attendances, only: %i[index show] do
        member do
          get 'report'
        end
      end
    end
    resources :csv_files, only: %i[index new create] do
      collection do
        post :import_csv, action: :import_csv
        get :export_csv, action: :export_csv
      end
    end
    resources :academic_years, param: :slug
    resources :fee_structures, param: :slug
    resources :fee_components, param: :slug
    resources :semesters, param: :slug
    resources :admissions, param: :slug
    resources :admission_documents
    resources :document_types, only: %i[index edit new create update destroy]
  end

  namespace :teachers do
    resources :users, param: :slug, only: %i[index show]
    resources :departments, param: :slug, only: %i[index show]
    resources :courses, param: :slug, only: %i[index show]
    resources :assignments, param: :slug
    resources :sessions, param: :slug do
      resources :attendances, only: %i[index new create] do
        member do
          get 'report'
        end
      end
    end
    resources :csv_files, only: %i[index new create] do
      collection do
        post :import_csv, action: :import_csv
        get :export_csv, action: :export_csv
      end
    end
    resources :admissions, param: :slug
  end

  namespace :students do
    resources :dashboard, only: [:index]
    resources :users, param: :slug
    resources :departments, param: :slug
    resources :courses, param: :slug
    resources :sessions, param: :slug do
      resources :attendances, only: %i[index show] do
        member do
          get 'report'
        end
      end
    end
  end

  resources :fees, param: :slug
  resources :fee_types, param: :slug
end
