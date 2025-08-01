# frozen_string_literal: true

# :nodoc:
class College < ApplicationRecord
  include Sluggable

  has_many :users, dependent: :destroy
  has_many :teachers, dependent: :destroy
  has_many :students, dependent: :destroy
  has_many :departments, dependent: :destroy
  has_many :courses, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :attendances, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :csv_files, dependent: :destroy
  has_many :academic_years, dependent: :destroy
  has_many :semesters, dependent: :destroy
  has_many :fee_structures, dependent: :destroy
  has_many :fee_components, dependent: :destroy
  has_many :admissions, dependent: :destroy
  has_many :document_types, dependent: :destroy
end
