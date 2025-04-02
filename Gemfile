# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.2'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.1.3", ">= 7.1.3.4"

gem 'bootsnap', require: false
gem 'devise'
gem 'haml'
gem 'cocoon'
gem 'jquery-rails'
gem 'pg'
gem 'pagy'
gem 'puma', '~> 6.4'
gem 'sass-rails', '>= 6'
gem 'trix-rails', require: 'trix'
gem 'uglifier', '>= 1.3.0'
gem 'webauthn'

gem 'activeadmin'
gem 'arctic_admin'
gem 'country_select'

# Background job adapter
gem 'sidekiq'
gem "importmap-rails"
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

gem 'paper_trail'
gem 'blamer'

# Use Active Storage
gem 'active_storage_validations'
gem 'image_processing', '~> 1.2'
gem 'mini_magick', '>= 4.9.5'

group :development, :test do
  gem 'debug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'listen', '~> 3.3'

  # backtrace for each query in Rails development console
  gem 'active_record_query_trace'

  # catch and show emails
  gem 'letter_opener'

  # security vulnerabilities
  gem 'brakeman', require: false

  gem 'bullet'

  gem 'fasterer'

  gem 'haml_lint', require: false
  gem 'ruby_css_lint', require: false
  gem 'scss_lint', require: false

  gem 'overcommit'

  gem 'reek'

  # code quality
  gem 'rubycritic'

  # code best practice
  gem 'rubocop', require: false
  gem 'rubocop-capybara'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  gem 'rubocop-rails_config'
  gem 'rubocop-rspec'

  gem 'capistrano', '~> 3.17', '>= 3.17.1'
  gem 'capistrano-bundler'
  gem 'capistrano-passenger'
  gem 'capistrano-rails'
  gem 'capistrano-rvm'
  gem 'sshkit-sudo'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end
