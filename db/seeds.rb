# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
unless AdminUser.any?
  AdminUser.create!(email: 'admin@example.com', password: 'password',
                    password_confirmation: 'password')
end

unless College.any?
  college = College.create!(name: 'First')
end

unless User.any?
 User.create!(college_id: College.first.id, email: 'jay@softices.in', password: '123456', password_confirmation: '123456', role: 'principal', name: 'Jay', confirmed_at: Time.now)
end
