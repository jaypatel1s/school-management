# frozen_string_literal: true

# :nodoc:
class Teacher < ApplicationRecord
  belongs_to :college
  belongs_to :department
  belongs_to :course
  belongs_to :user
  has_many :assignments
  has_many :sessions, dependent: :destroy
end
