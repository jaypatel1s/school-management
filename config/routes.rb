# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  def draw(file)
    instance_eval(Rails.root.join("config/routes/#{file}.rb").read)
  end

  # API routes
  namespace :api do
    namespace :v1 do
      # OAuth endpoints
      use_doorkeeper do
        skip_controllers :applications, :authorized_applications
      end

      # Authentication endpoints (will be handled by Doorkeeper)
      post 'login', to: 'sessions#create'
      post 'logout', to: 'sessions#destroy'
      get 'me', to: 'sessions#me'
      post 'signup', to: 'registrations#create'

      # Role-based routes
      namespace :principals do
        get 'dashboard', to: 'dashboard#index'
        resources :students, only: [:index, :show, :create, :update, :destroy]
        resources :teachers, only: [:index, :show, :create, :update, :destroy]
        resources :departments, only: [:index, :show, :create, :update, :destroy]
        resources :courses, only: [:index, :show, :create, :update, :destroy]
        resources :semesters, only: [:index, :show, :create, :update, :destroy]
        resources :attendances, only: [:index, :show, :create, :update, :destroy] do
          collection do
            get :report
          end
        end
        resources :assignments, only: [:index, :show, :create, :update, :destroy]
        resources :exams, only: [:index, :show, :create, :update, :destroy]
        resources :fees, only: [:index, :show, :create, :update, :destroy] do
          collection do
            get :collection_report
          end
        end
        resources :admissions, only: [:index, :show, :create, :update, :destroy] do
          member do
            post :approve
            post :reject
          end
        end
        resources :books, param: :slug do
          member do
            post :issue
          end
        end
        resources :book_issues do
          member do
            post :return_book
            post :renew
          end
        end
      end

      namespace :students do
        get 'dashboard', to: 'dashboard#index'
        resources :courses, only: [:index, :show]
        resources :attendances, only: [:index, :show] do
          collection do
            get :report
          end
        end
        resources :fees, only: [:index, :show] do
          collection do
            get :summary
          end
        end
        resources :assignments, only: [:index, :show]
        resources :exams, only: [:index, :show]
        resources :books, param: :slug, only: [:index, :show]
        resources :book_issues, only: [:index, :show]
      end

      namespace :teachers do
        get 'dashboard', to: 'dashboard#index'
        resources :courses, only: [:index, :show, :update]
        resources :assignments, only: [:index, :show, :create, :update, :destroy]
        resources :attendances, only: [:index, :show, :create, :update, :destroy] do
          collection do
            post :bulk_mark
          end
        end
        resources :exams, only: [:index, :show, :create, :update, :destroy]
        resources :students, only: [:index, :show]
      end

      namespace :super_admins do
        get 'dashboard', to: 'dashboard#index'
        resources :colleges, only: [:index, :show, :create, :update, :destroy]
        resources :users, only: [:index, :show, :create, :update, :destroy]
      end

      namespace :public do
        resources :colleges, only: [:index, :show]
        resources :admissions, only: [:index, :show, :create]
      end
    end
  end

  # mount Sidekiq::Web in your Rails app
  Sidekiq::Web.use Rack::Auth::Basic, 'Protected Area' do |username, password|
    username == 'jay.gami@softices.in' && password == '123456'
  end

  # mount Sidekiq::Web in your Rails app
  mount Sidekiq::Web => '/sidekiq'

  match '*path' => redirect { |_p, req|
    req.flash[:alert] = "Page doesn't exist"
    '/'
  }, via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
