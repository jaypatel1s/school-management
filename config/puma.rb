max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
threads min_threads_count, max_threads_count

environment ENV.fetch("RAILS_ENV") { "production" }

pidfile "#{shared_path}/tmp/pids/puma.pid"
state_path "#{shared_path}/tmp/sockets/puma.state"
bind "unix://#{shared_path}/tmp/sockets/puma.sock"

# Uncomment if you want clustered mode (multiple workers)
# workers ENV.fetch("WEB_CONCURRENCY") { 2 }
# preload_app!

worker_timeout 60 if ENV.fetch("RAILS_ENV") == "development"

plugin :tmp_restart
