constraints subdomain: ENV['BASE_URL'] do
  draw :authentication
  draw :school
  draw :profile
  draw :companies
end
