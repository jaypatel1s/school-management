# config/deploy/production.rb
server '54.167.122.206', user: 'ubuntu', roles: %w{app db web}
set :ssh_options, {
  keys: %w(/home/jay/Downloads/college.pem),
  forward_agent: false,
  auth_methods: %w(publickey)
}