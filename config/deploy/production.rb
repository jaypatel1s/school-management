server '54.167.122.206', user: 'ubuntu', roles: %w{app db web}

set :ssh_options, {
  keys: %w(/home/ubuntu/.ssh/id_rsa),
  forward_agent: false,
  auth_methods: %w(publickey)
}
