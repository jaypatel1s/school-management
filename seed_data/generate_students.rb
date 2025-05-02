# frozen_string_literal: true

require 'csv'
file_path = 'students1.csv'

CSV.open(file_path, 'w', write_headers: true,
                         headers: %w[name email password password_confirmation role]) do |csv|
  20.times do |i|
    name = "Student #{i + 1}"
    email = "student#{i + 1}@example.com"
    password = "password#{i + 1}"
    password_confirmation = password
    role = 'student'
    csv << [name, email, password, password_confirmation, role]
  end
end

puts "CSV file created at #{file_path}"
