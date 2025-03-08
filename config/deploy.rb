# config/deploy.rb
set :application, 'school'
set :repo_url, 'https://github.com/jaypatel1s/school-management.git'
set :branch, 'main'
set :deploy_to, '/home/ubuntu/school'
set :linked_files, %w{config/database.yml config/master.key}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/uploads}
set :keep_releases, 5
set :rvm_ruby_version, '3.2.0'

