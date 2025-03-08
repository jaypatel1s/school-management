class User < ApplicationRecord
  include Sluggable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable, :confirmable, :timeoutable, :trackable
  belongs_to :college
  has_many :departments, foreign_key: :head_id, dependent: :destroy
  has_many :courses, foreign_key: :teacher_id, dependent: :destroy
  # has_many :attendances, dependent: :destroy

  has_many :course_enrollments
  has_many :enrolled_courses, through: :course_enrollments, source: :course

  enum role: { principal: 0, teacher: 1, student: 2 }

  def principal?
    %w[principal].include?(role)
  end

  def teacher?
    %w[teacher].include?(role)
  end

  def user?
    %w[student].include?(role)
  end
end
