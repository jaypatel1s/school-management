class Classroom < ApplicationRecord
  belongs_to :college
  belongs_to :subject
end
