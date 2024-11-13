class Classroom < ApplicationRecord
  include Sluggable

  belongs_to :college
  belongs_to :subject
end
