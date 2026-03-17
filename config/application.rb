# frozen_string_literal: true

require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_text/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SchoolManagementSystem
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.autoload_paths += %W[#{config.root}/lib]

    # API-only configuration
    config.api_only = true

    # Configure middleware for API
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore, key: '_school_management_api_session'

    # CORS configuration
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000' # Next.js development server
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: true
      end
    end

    # Active Storage configuration for API
    config.active_storage.variant_processor = :mini_magick
    config.active_storage.url_expires_in = 1.hour

    config.i18n.available_locales = %i[en]
    config.i18n.default_locale = :en
    config.i18n.fallbacks = [:en]
    config.active_record.yaml_column_permitted_classes = [
      Symbol, Date, Time, ActiveSupport::TimeWithZone,
      ActiveSupport::TimeZone, ActiveSupport::HashWithIndifferentAccess
    ]
  end
end
