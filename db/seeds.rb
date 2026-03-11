# frozen_string_literal: true

# Production-Ready College Management System Seeds
# Complete admission workflow with security, validation, and error handling

puts '=== COLLEGE MANAGEMENT SYSTEM SEEDS ==='
puts "Environment: #{Rails.env}"
puts "Timestamp: #{Time.current}"
puts ''

# Security and validation helper methods
module SeedHelpers
  def self.generate_secure_password(base = nil)
    length = ENV.fetch('PASSWORD_MIN_LENGTH', 12).to_i
    password = SecureRandom.hex(length / 2)

    # Add special character if required
    if ENV.fetch('PASSWORD_REQUIRE_SPECIAL_CHARS', 'true') == 'true'
      password += "!@#$%^&*"[rand(7)]
    end

    password
  end

  def self.validate_email(email)
    email.present? && email.match?(/\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i)
  end

  def self.validate_phone(phone)
    phone.present? && phone.match?(/\A[\+]?[1-9][\d]{0,15}\z/)
  end

  def self.create_record(model_class, attributes, &block)
    begin
      record = model_class.find_or_create_by!(attributes, &block)
      Rails.logger.info "Created: #{model_class.name} ##{record.id}"
      record
    rescue => e
      Rails.logger.error "Failed to create #{model_class.name}: #{e.message}"
      raise
    end
  end

  def self.get_gateway_api_key(gateway_name)
    case gateway_name.downcase
    when 'razorpay'
      ENV['RAZORPAY_API_KEY'] || 'rzp_test_123456'
    when 'payu'
      ENV['PAYU_API_KEY'] || 'payu_test_123456'
    else
      'test_key'
    end
  end
end

# Production safety check
if Rails.env.production?
  puts '🚨 PRODUCTION ENVIRONMENT DETECTED 🚨'
  puts 'This will create production data. Please ensure:'
  puts '1. You have a recent database backup'
  puts '2. Environment variables are properly configured'
  puts '3. You have reviewed the data configuration'
  puts ''

  print 'Type "PROCEED" to continue: '
  confirmation = gets.chomp.strip

  unless confirmation == 'PROCEED'
    puts 'Seeding aborted by user.'
    exit
  end
end

begin
  # Create Admin User
  puts 'Creating admin user...'
  admin_password = ENV['SUPER_ADMIN_PASSWORD'] || 'admin123'
  admin_user = SeedHelpers.create_record(User, email: 'admin@school.edu') do |user|
    user.name = 'System Administrator'
    user.password = admin_password
    user.password_confirmation = admin_password
    user.role = 'super_admin'
  end

  # Create Colleges
  puts 'Creating colleges...'
  colleges_data = [
    {
      name: 'Engineering College',
      address: '123 Engineering Boulevard, Tech City, ST 12345',
      landmark: 'Near Tech Park',
      pincode: '12345',
      city: 'Tech City',
      state: 'Technology State',
      country: 'United States'
    },
    {
      name: 'Medical College',
      address: '456 Medical Avenue, Health City, ST 12346',
      landmark: 'Near Hospital Complex',
      pincode: '12346',
      city: 'Health City',
      state: 'Wellness State',
      country: 'United States'
    },
    {
      name: 'Business College',
      address: '789 Business Street, Commerce City, ST 12347',
      landmark: 'Near Business District',
      pincode: '12347',
      city: 'Commerce City',
      state: 'Trade State',
      country: 'United States'
    }
  ]

  colleges = []
  colleges_data.each_with_index do |college_data, index|
    college = SeedHelpers.create_record(College, name: college_data[:name]) do |c|
      c.assign_attributes(college_data)
      c.slug = "#{college_data[:name].downcase.gsub(' ', '-')}-#{index + 1}"
    end
    colleges << college
    puts " Created College: #{college.name}"
  end

  # Create Departments
  puts 'Creating departments...'
  departments_data = [
    { name: 'Computer Science' },
    { name: 'Mechanical Engineering' },
    { name: 'Electrical Engineering' },
    { name: 'Medicine' },
    { name: 'Business Administration' },
    { name: 'Marketing' }
  ]

  departments = []
  colleges.each_with_index do |college, college_index|
    departments_data.each_with_index do |dept_data, dept_index|
      department = SeedHelpers.create_record(Department,
        college: college,
        name: dept_data[:name]
      ) do |d|
        d.slug = "#{college.slug}-#{dept_data[:name].downcase.gsub(' ', '-')}"
      end
      departments << department
    end
  end
  puts " Created #{departments.count} departments"

  # Create Courses
  puts 'Creating courses...'
  courses_data = [
    { name: 'Computer Science Engineering', credits: 4, dept_name: 'Computer Science' },
    { name: 'Mechanical Engineering', credits: 4, dept_name: 'Mechanical Engineering' },
    { name: 'Electrical Engineering', credits: 4, dept_name: 'Electrical Engineering' },
    { name: 'MBBS', credits: 5, dept_name: 'Medicine' },
    { name: 'BBA', credits: 3, dept_name: 'Business Administration' },
    { name: 'MBA Marketing', credits: 2, dept_name: 'Marketing' }
  ]

  courses = []
  departments.each do |department|
    course_data = courses_data.find { |c| c[:dept_name] == department.name }
    next unless course_data

    course = SeedHelpers.create_record(Course,
      department: department,
      name: course_data[:name]
    ) do |c|
      c.credits = course_data[:credits]
      c.college = department.college
      c.slug = "#{department.slug}-#{course_data[:name].downcase.gsub(' ', '-')}"
    end
    courses << course
  end
  puts " Created #{courses.count} courses"

  # Create Admission Periods
  puts 'Creating admission periods...'
  admissions_data = [
    {
      name: 'Fall 2024 Admission',
      start_date: 1.month.ago,
      end_date: 2.months.from_now
    },
    {
      name: 'Spring 2025 Admission',
      start_date: 1.month.from_now,
      end_date: 4.months.from_now
    }
  ]

  admissions = []
  admissions_data.each_with_index do |admission_data, index|
    admission = SeedHelpers.create_record(Admission, name: admission_data[:name]) do |a|
      a.start_date = admission_data[:start_date]
      a.end_date = admission_data[:end_date]
      a.slug = "#{admission_data[:name].downcase.gsub(' ', '-')}-#{index + 1}"
    end
    admissions << admission
  end

  # Activate colleges for admissions
  colleges.each do |college|
    admissions.each do |admission|
      SeedHelpers.create_record(AdmissionCollegeActive,
        admission: admission,
        college: college,
        active: true
      )
    end
  end
  puts "✅ Created #{admissions.count} admission periods"

  # Create Academic Years
  puts 'Creating academic years...'
  colleges.each do |college|
    (2022..2025).each do |year|
      SeedHelpers.create_record(AcademicYear,
        college: college,
        name: "#{year}-#{year + 1}",
        start_date: Date.new(year, 7, 1),
        end_date: Date.new(year + 1, 6, 30)
      )
    end
  end
  puts "✅ Created academic years"

  # Create Fee Structures
  puts 'Creating fee structures...'
  fee_structures_data = [
    { name: 'Engineering Fee Structure', total_amount: 50000, college_type: 'engineering' },
    { name: 'Medical Fee Structure', total_amount: 75000, college_type: 'medical' },
    { name: 'Business Fee Structure', total_amount: 35000, college_type: 'business' }
  ]

  fee_structures = []
  colleges.each_with_index do |college, index|
    fee_data = fee_structures_data[index % fee_structures_data.length]

    # Get academic year and department
    academic_year = AcademicYear.find_by(college: college, name: '2024-2025')
    department = college.departments.first

    fee_structure = SeedHelpers.create_record(FeeStructure,
      college: college,
      name: fee_data[:name]
    ) do |fs|
      fs.total_amount = fee_data[:total_amount]
      fs.academic_year = academic_year
      fs.department = department
      fs.slug = "#{college.slug}-#{fee_data[:name].downcase.gsub(' ', '-')}"
    end
    fee_structures << fee_structure
  end
  puts "✅ Created #{fee_structures.count} fee structures"

  # Create Semesters
  puts 'Creating semesters...'
  semesters = []
  colleges.each do |college|
    (1..8).each do |semester_num|
      semester = SeedHelpers.create_record(Semester,
        college: college,
        name: "SEM#{semester_num}"
      )
      semesters << semester
    end
  end
  puts "✅ Created #{semesters.count} semesters"

  # Create Fee Components
  puts 'Creating fee components...'
  fee_structures.each do |fee_structure|
    college_semesters = semesters.select { |s| s.college_id == fee_structure.college_id }

    college_semesters.first(4).each do |semester|
      SeedHelpers.create_record(FeeComponent,
        fee_structure: fee_structure,
        semester: semester
      ) do |fc|
        fc.amount = fee_structure.total_amount / 4.0
        fc.name = "Semester #{semester.name} Fee"
        fc.college = fee_structure.college
      end
    end
  end
  puts "✅ Created fee components"

  # Create Document Types
  puts 'Creating document types...'
  document_types = [
    'High School Certificate',
    'Intermediate Certificate',
    'Birth Certificate',
    'Passport Size Photo',
    'Aadhar Card',
    'Transfer Certificate',
    'Migration Certificate'
  ]

  colleges.each do |college|
    document_types.each do |doc_type_name|
      SeedHelpers.create_record(DocumentType,
        college: college,
        name: doc_type_name
      ) do |dt|
        dt.required = ['High School Certificate', 'Intermediate Certificate', 'Passport Size Photo'].include?(doc_type_name)
      end
    end
  end
  puts "✅ Created document types"

  # Create Payment Gateways
  puts 'Creating payment gateways...'
  payment_gateways_data = [
    { name: 'Razorpay', active: true },
    { name: 'PayU', active: false }
  ]

  colleges.each do |college|
    payment_gateways_data.each do |gateway_data|
      api_key = SeedHelpers.get_gateway_api_key(gateway_data[:name])

      SeedHelpers.create_record(CollegePaymentGateway,
        college: college,
        name: gateway_data[:name]
      ) do |cpg|
        cpg.api_key = api_key
        cpg.active = gateway_data[:active]
      end
    end
  end
  puts "✅ Created payment gateways"

  # Create Principals
  puts 'Creating principals...'
  principals = []
  colleges.each_with_index do |college, index|
    principal_password = SeedHelpers.generate_secure_password('principal')
    principal_email = "principal#{index + 1}@college-#{index + 1}.edu"

    principal_user = SeedHelpers.create_record(User, email: principal_email) do |user|
      user.name = "Principal #{college.name}"
      user.password = principal_password
      user.password_confirmation = principal_password
      user.role = 'principal'
      user.college = college
    end

    principal = SeedHelpers.create_record(Teacher, user: principal_user) do |teacher|
      teacher.college = college
      teacher.department = college.departments.first
      teacher.course = college.departments.first.courses.first
    end

    principals << principal
    puts "✅ Created Principal for #{college.name}: #{principal_email}"
  end

  # Create Teachers
  puts 'Creating teachers...'
  teachers = []
  departments.each_with_index do |department, index|
    (1..3).each do |teacher_num|
      teacher_password = SeedHelpers.generate_secure_password('teacher')
      teacher_email = "teacher#{index + 1}-#{teacher_num}@college-#{colleges.index(department.college) + 1}.edu"

      teacher_user = SeedHelpers.create_record(User, email: teacher_email) do |user|
        user.name = "Teacher #{department.name} #{teacher_num}"
        user.password = teacher_password
        user.password_confirmation = teacher_password
        user.role = 'teacher'
        user.college = department.college
      end

      teacher = SeedHelpers.create_record(Teacher, user: teacher_user) do |t|
        t.college = department.college
        t.department = department
        t.course = department.courses.first
      end

      teachers << teacher
    end
  end
  puts "✅ Created #{teachers.count} teachers"

  # Assign Teachers to Courses
  puts 'Assigning teachers to courses...'
  courses.each do |course|
    available_teachers = teachers.select { |t| t.department_id == course.department_id }
    available_teachers.first(2).each do |teacher|
      SeedHelpers.create_record(CourseTeacher,
        course: course,
        teacher: teacher
      )
    end
  end
  puts "✅ Assigned teachers to courses"

  # Create Sample Admission Applications
  puts 'Creating sample admission applications...'
  sample_applications_data = [
    { name: 'Alex Johnson', email: 'alex.johnson@example.com', phone: '+1-555-010-1001' },
    { name: 'Taylor Smith', email: 'taylor.smith@example.com', phone: '+1-555-010-1002' },
    { name: 'Jordan Brown', email: 'jordan.brown@example.com', phone: '+1-555-010-1003' },
    { name: 'Casey Davis', email: 'casey.davis@example.com', phone: '+1-555-010-1004' },
    { name: 'Morgan Wilson', email: 'morgan.wilson@example.com', phone: '+1-555-010-1005' }
  ]

  admission_applications = []
  admissions.each_with_index do |admission, admission_index|
    sample_applications_data.each_with_index do |app_data, app_index|
      college = colleges[app_index % colleges.length]
      department = departments[app_index % departments.length]
      course = courses[app_index % courses.length]
      fee_structure = fee_structures[colleges.index(college)]

      application = SeedHelpers.create_record(AdmissionApplication,
        email: app_data[:email],
        admission: admission
      ) do |app|
        app.assign_attributes(
          name: app_data[:name],
          phone: app_data[:phone],
          college: college,
          department: department,
          course: course,
          fee_structure: fee_structure,
          status: 'document_upload_pending',
          slug: "#{admission.slug}-#{app_data[:name].downcase.gsub(' ', '-')}"
        )
      end

      admission_applications << application
      puts "✅ Created Application: #{application.name}"
    end
  end

  # Create Students from Applications (simulating completed admission)
  puts 'Creating students from completed applications...'
  students = []
  admission_applications.first(3).each_with_index do |app, index|
    student_password = SeedHelpers.generate_secure_password('student')

    student_user = SeedHelpers.create_record(User, email: app.email) do |user|
      user.name = app.name
      user.password = student_password
      user.password_confirmation = student_password
      user.role = 'student'
      user.college = app.college
    end

    student = SeedHelpers.create_record(Student, user: student_user) do |s|
      s.college = app.college
      s.admission_application = app
      s.status = 'active'
      s.roll_number = "#{app.application_number}-#{student_user.id}"
      s.mobile_no = app.phone
    end

    # Enroll student in course
    SeedHelpers.create_record(StudentCourse,
      student: student,
      course: app.course
    )

    students << student
    puts "✅ Created Student: #{student_user.email}"
  end

  puts ''
  puts '🎉 SEEDING COMPLETED SUCCESSFULLY! 🎉'
  puts ''
  puts 'Login Credentials:'
  puts "Super Admin: admin@school.edu / #{admin_password}"
  puts ''
  puts 'Principals:'
  principals.each_with_index do |principal, index|
    puts "  #{principal.user.email}"
  end
  puts '  Password: [Securely Generated]'
  puts ''
  puts 'Teachers (sample):'
  teachers.first(3).each_with_index do |teacher, index|
    puts "  #{teacher.user.email}"
  end
  puts '  Password: [Securely Generated]'
  puts ''
  puts 'Students (from admission):'
  students.each_with_index do |student, index|
    puts "  #{student.user.email}"
  end
  puts '  Password: [Securely Generated]'
  puts ''
  puts 'Access URLs:'
  puts '  Admin Login: /users/sign_in'
  puts '  Public Admission: /public_admissions'
  puts ''
  puts 'Environment Variables for Production:'
  puts '  SUPER_ADMIN_PASSWORD=your_secure_password'
  puts '  RAZORPAY_API_KEY=your_production_key'
  puts '  PASSWORD_MIN_LENGTH=12'
  puts '  PASSWORD_REQUIRE_SPECIAL_CHARS=true'

rescue => e
  puts ''
  puts '❌ SEEDING FAILED ❌'
  puts "Error: #{e.message}"
  puts ''
  puts 'Please check the error and fix any issues before running again.'
  puts 'You may need to restore from backup if data was partially created.'
  exit 1
end
