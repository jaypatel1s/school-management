set :application, 'school'
set :repo_url, 'git@github.com:jaypatel1s/school-management.git'
set :branch, 'main'
set :deploy_to, '/home/jay/public/college'

append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/uploads', 'storage', '.bundle'
append :linked_files, 'config/database.yml', 'config/master.key', 'config/credentials.yml.enc'

set :keep_releases, 5
set :rvm_ruby_version, '3.2.0'
set :passenger_restart_with_touch, true
