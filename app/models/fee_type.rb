class FeeType < ApplicationRecord
   include Sluggable

   belongs_to :college
   has_many :fees, dependent: :destroy
   validates :name, presence: true
end
