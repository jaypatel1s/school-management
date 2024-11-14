class User < ApplicationRecord
  include Sluggable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable, :confirmable, :timeoutable, :trackable
  belongs_to :college
  has_many :teacher_subjects
  has_many :subjects, through: :teacher_subjects
  has_many :teacher_classrooms
  has_many :classrooms, through: :teacher_classrooms

  accepts_nested_attributes_for :teacher_subjects, reject_if: :all_blank, allow_destroy: true
  accepts_nested_attributes_for :teacher_classrooms, reject_if: :all_blank, allow_destroy: true

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
