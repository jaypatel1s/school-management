class Subject < ApplicationRecord
  include Sluggable

  belongs_to :college
end
