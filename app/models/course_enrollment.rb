class CourseEnrollment < ApplicationRecord
  belongs_to :college
  belongs_to :user
  belongs_to :course

  # enum role: { pending: 0, approved: 1, rejected: 2 }
end
