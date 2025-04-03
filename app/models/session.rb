# frozen_string_literal: true

class Session < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :course
  has_many :attendances
  has_many :students, through: :attendances, class_name: 'User'

  validates :date, presence: true

  before_create :generate_qr_token

  def generate_qr_token
    self.qr_token = SecureRandom.urlsafe_base64(16)
  end

  def qr_code_url
    host = if Rails.env.development?
             'localhost:3000'
           else
             'your-production-domain.com'
           end

    Rails.application.routes.url_helpers.new_college_session_attendance_url(
      college_slug: college.slug,
      session_slug: slug,
      qr_token: qr_token,
      host: host
    )
  end

  def attendance_window_expired?
    (DateTime.now.to_i - created_at.to_i) > 600 # 10 minutes in seconds
  end

  def enrolled_students
    course.students
  end

  def generate_qr_code
    qr = RQRCode::QRCode.new(qr_code_url)
    qr.as_svg(
      offset: 0,
      color: '000',
      shape_rendering: 'crispEdges',
      module_size: 6,
      standalone: true
    )
  end

  # def mark_absent_students
  #   # Find all students enrolled in this session's course who didn't mark attendance
  #   absent_students = course.students.where.not(id: attendances.select(:student_id))

  #   absent_students.each do |student|
  #     attendances.create(student: student, status: 'absent')
  #   end

  #   # Generate and store report
  #   generate_attendance_report
  # end

  def generate_attendance_report
    report_data = attendances.includes(:student).map do |attendance|
      {
        student_id: attendance.student.id,
        name: attendance.student.name,
        status: attendance.status,
        timestamp: attendance.created_at
      }
    end

    csv_content = CSV.generate(headers: true) do |csv|
      csv << ['Student ID', 'Name', 'Status', 'Timestamp']
      report_data.each { |row| csv << row.values }
    end

    # Save to local storage
    file_path = Rails.public_path.join('attendance_reports', "session_#{id}_report.csv")
    FileUtils.mkdir_p(File.dirname(file_path))
    File.write(file_path, csv_content)

    file_path
  end
end
