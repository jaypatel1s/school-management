# frozen_string_literal: true

class Exam < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :academic_year
  belongs_to :semester
  belongs_to :course
  has_many :exam_attendances, dependent: :destroy
  has_many :attending_students, through: :exam_attendances, source: :student
  has_many :exam_results, dependent: :destroy

  validates :name, presence: true
  validates :scheduled_at, presence: true
  validates :max_marks, presence: true, numericality: { greater_than: 0 }

  enum :exam_type, { midterm: 0, final: 1, quiz: 2, assignment_test: 3 }
  scope :upcoming, -> { where('scheduled_at > ?', Time.current).order(scheduled_at: :asc) }

  after_create :generate_default_attendance_and_csv

  def generate_default_attendance_and_csv
    student_ids = Student.joins(:student_courses)
                     .where(student_courses: { course_id: course_id })
                     .pluck(:id)

    records = student_ids.map do |student_id|
      {
        exam_id: id,
        student_id: student_id,
        status: 0, # present by default
        created_at: Time.current,
        updated_at: Time.current
      }
    end
    ExamAttendance.insert_all(records) if records.any?

    generate_attendance_csv
  end

  def generate_attendance_csv
    attendances = exam_attendances.includes(student: :user)

    csv_data = CSV.generate(headers: true) do |csv|
      csv << %w[exam_id student_id student_name roll_number status]
      attendances.each do |attendance|
        csv << [
          id,
          attendance.student_id,
          attendance.student.user.name,
          attendance.student.roll_number,
          attendance.status
        ]
      end
    end

    file_path = Rails.root.join("tmp", "exam_#{id}_attendance.csv")
    File.write(file_path, csv_data)

    Teacher.where(course_id: course_id).each do |teacher|
      ExamMailer.attendance_csv(teacher, self, file_path.to_s).deliver_later
    end
  end
end
