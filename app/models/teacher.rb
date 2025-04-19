class Teacher < ApplicationRecord
  belongs_to :college
  belongs_to :department
  belongs_to :course
  belongs_to :user
end
