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
  college = College.create!(name: "XYZ College")
end

unless User.any?
  teacher1 = User.create!(name: "Professor Alice", email: "alice@college.com", role: :teacher, college: college, password: '123456', password_confirmation: '123456')
  teacher2 = User.create!(name: "Professor Bob", email: "bob@college.com", role: :teacher, college: college, password: '123456', password_confirmation: '123456')
  head_of_department = User.create!(name: "Dr. Smith", email: "smith@college.com", role: :principal, college: college, password: '123456', password_confirmation: '123456')
end

unless Department.any?
  # Seed Departments with Head of Department
  bsc_it_department = Department.create!(name: "BSc IT", head: head_of_department, college: college)
end

unless Course.any?
  # Seed Courses under BSc IT Department with Teachers
  Course.create!(name: "IoT (Internet of Things)", description: "Learn about IoT applications and devices.", department: bsc_it_department, teacher: teacher1, credits: 3 , college: college)
  Course.create!(name: "Arduino Programming", description: "Programming and working with Arduino boards.", department: bsc_it_department, teacher: teacher2, credits: 3, college: college)
end
