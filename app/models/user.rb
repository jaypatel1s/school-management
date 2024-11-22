class User < ApplicationRecord
  include Sluggable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable, :confirmable, :timeoutable, :trackable
  belongs_to :college
  has_many :teacher_subjects, dependent: :destroy
  has_many :subjects, through: :teacher_subjects
  has_many :teacher_classrooms, through: :teacher_subjects
  has_many :attendances, dependent: :destroy  # A user (student) can have multiple attendance records

  accepts_nested_attributes_for :teacher_subjects, reject_if: :all_blank, allow_destroy: true

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
