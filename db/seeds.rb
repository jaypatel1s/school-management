# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
admin_user = AdminUser.find_or_initialize_by(email: 'admin@example.com')
admin_user.password = 'password'  # This will set the password_digest field automatically
admin_user.password_confirmation = 'password'
admin_user.save!
college = College.find_or_initialize_by(name: 'First')
college.save!  # Save the College if it's new
user = User.find_or_initialize_by(college_id: college.id, email: 'jay@softices.in', password: '123456', password_confirmation: '123456', role: 'principal', name: 'Jay', confirmed_at: Time.now)
user.save!  # Save the User if it's new or updated
