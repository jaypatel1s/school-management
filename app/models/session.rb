class Session < ApplicationRecord
  include Sluggable

  belongs_to :college
  has_many :attendances
  has_many :students, through: :attendances, class_name: 'User'

  validates :date, presence: true

  before_create :generate_qr_token
  after_create :schedule_absent_marking

  def generate_qr_token
    self.qr_token = SecureRandom.urlsafe_base64(16)
  end

  def qr_code_url
    Rails.application.routes.url_helpers.mark_attendance_url(qr_token: qr_token)
  end

  def attendance_window_expired?
    (DateTime.now.to_i - created_at.to_i) > 600 # 10 minutes in seconds
  end

  def mark_absent_students
    # Find all students enrolled in this session's course who didn't mark attendance
    absent_students = course.students.where.not(id: attendances.select(:student_id))

    absent_students.each do |student|
      attendances.create(student: student, status: 'absent')
    end

    # Generate and store report
    generate_attendance_report
  end

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
    file_path = Rails.root.join('public', 'attendance_reports', "session_#{id}_report.csv")
    FileUtils.mkdir_p(File.dirname(file_path))
    File.write(file_path, csv_content)

    file_path
  end

  private

  def schedule_absent_marking
    # Schedule background job to mark absent students after 10 minutes
    MarkAbsentStudentsJob.set(wait: 10.minutes).perform_later(id)
  end
end
