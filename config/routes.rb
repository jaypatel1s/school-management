# frozen_string_literal: true
Rails.application.routes.draw do
  def draw(file)
    instance_eval(File.read(Rails.root.join("config/routes/#{file}.rb")))
  end

  # mount Sidekiq::Web in your Rails app

  draw :common

  root to: 'home#index'

  match '*path' => redirect { |_p, req|
    req.flash[:alert] = "Page doesn't exist"
    '/'
  }, via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
