WebAuthn.configure do |config|
  config.allowed_origins = 'https://school-management-production-56ed.up.railway.app' # replace with your domain
  config.rp_name = 'School Management System'
  config.rp_id = 'school-management-production-56ed.up.railway.app' # replace with your domain
end
