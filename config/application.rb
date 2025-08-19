# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SchoolManagementSystem
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.autoload_paths += %W[#{config.root}/lib]
    # config.active_job.queue_adapter = :sidekiq
    config.i18n.available_locales = %i[en]
    config.i18n.default_locale = :en
    config.i18n.fallbacks = [:en]
    config.active_record.yaml_column_permitted_classes = [
      Symbol, Date, Time, ActiveSupport::TimeWithZone,
      ActiveSupport::TimeZone, ActiveSupport::HashWithIndifferentAccess
    ]
  end
end
