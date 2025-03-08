# Capfile
# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

# Load custom tasks from `lib/capistrano/tasks` if you have any
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }

# Load plugins
require "capistrano/rvm"
require "capistrano/rails"
require "capistrano/passenger"