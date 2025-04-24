# frozen_string_literal: true

set :application, 'school'
set :repo_url, 'https://github.com/jaypatel1s/school-management.git'
set :pty, true
set :rails_env, 'production'
set :rvm_ruby_string, '3.2.2'
set :ssh_options, { forward_agent: true }
set :deploy_via, :remote_catch

# Passenger
set :passenger_restart_with_touch, true
set :passenger_roles, :app
set :passenger_restart_runner, :sequence
set :passenger_restart_wait, 5
set :passenger_restart_limit, 2
set :passenger_restart_with_sudo, true
set :passenger_environment_variables, {}
set :passenger_restart_command, 'passenger-config restart-app'
set :passenger_restart_options, -> { "#{deploy_to} --ignore-app-not-running" }

append :linked_dirs, 'log', 'tmp', 'storage', '.bundle', 'config/credentials'

# Default value for keep_releases is 5
set :keep_releases, 5

namespace :deploy do
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end
  namespace :bundler do
    task :install do
      on roles(:app) do
        within release_path.to_s do
          execute! :sudo, "#{fetch(:rvm_path)}/bin/rvm #{fetch(:rvm_ruby_version)} do "\
          "rvmsudo bundle install --path #{shared_path}/bundle --without development "\
          'test --deployment --quiet'
        end
      end
    end
  end

  after :publishing, :restart
end
