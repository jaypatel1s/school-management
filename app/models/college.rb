# frozen_string_literal: true

class College < ApplicationRecord
  include Sluggable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :users, dependent: :destroy
  has_many :subjects, dependent: :destroy
  has_many :classrooms, dependent: :destroy
  has_many :teacher_classrooms, dependent: :destroy
  has_many :teacher_subjects, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :attendances, dependent: :destroy
end
