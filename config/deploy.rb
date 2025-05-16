# config/deploy.rb
set :application, 'school'
set :repo_url, 'git@github.com:jaypatel1s/school-management.git'  # Use SSH URL
set :branch, 'main'
set :deploy_to, '/home/jay/public/college'
append :linked_dirs, 'log', 'tmp', 'storage', '.bundle', 'config/credentials'


# set :linked_files, %w{config/database.yml config/master.key config/credentials.yml.enc}
# set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/uploads}
set :keep_releases, 5
set :rvm_ruby_version, '3.2.0'

namespace :puma do
  task :make_dirs do
    on roles(:app) do
      execute "mkdir -p #{shared_path}/tmp/sockets #{shared_path}/tmp/pids"
    end
  end
end

before 'puma:start', 'puma:make_dirs'
after 'deploy:published', 'puma:restart'
  