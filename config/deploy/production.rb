# config/deploy/production.rb
server '140.245.9.121', user: 'jay', roles: %w[app db web]
set :stage, 'production'
set :branch, 'main'
set :deploy_to, '/home/jay/public/college'


