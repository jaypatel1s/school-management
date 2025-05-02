# frozen_string_literal: true

class College < ApplicationRecord
  include Sluggable

  has_many :users, dependent: :destroy
  has_many :teachers, dependent: :destroy
  has_many :students, dependent: :destroy
  has_many :departments, dependent: :destroy
  has_many :courses, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :attendances, dependent: :destroy
  has_many :csv_files, dependent: :destroy
  has_many :fees, dependent: :destroy
  has_many :fee_types, dependent: :destroy
end
