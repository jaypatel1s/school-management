# frozen_string_literal: true

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

college = College.create!(name: 'XYZ College') unless College.any?

unless User.any?
  User.create!(name: 'Professor Alice', email: 'alice@college.com', role: :teacher, college: college,
               password: '123456', password_confirmation: '123456', confirmed_at: Time.zone.now)
  User.create!(name: 'Professor Bob', email: 'bob@college.com', role: :teacher, college: college,
               password: '123456', password_confirmation: '123456', confirmed_at: Time.zone.now)
  User.create!(name: 'Dr. Smith', email: 'smith@college.com', role: :principal, college: college,
               password: '123456', password_confirmation: '123456', confirmed_at: Time.zone.now)
end
