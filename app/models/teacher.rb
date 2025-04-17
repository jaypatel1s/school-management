class Teacher < ApplicationRecord
  belongs_to :college
  belongs_to :department
end
