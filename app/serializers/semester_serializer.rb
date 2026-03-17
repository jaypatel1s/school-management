# frozen_string_literal: true

class SemesterSerializer < ApplicationSerializer
  attributes :id, :name, :start_date, :end_date, :college_id, :created_at, :updated_at

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :courses_count do |object|
    CountSerializer.new(object.courses)
  end

  attribute :students_count do |object|
    CountSerializer.new(object.students)
  end

  attribute :active do |object|
    object.start_date <= Date.current && object.end_date >= Date.current
  end

  attribute :completed do |object|
    object.end_date < Date.current
  end
end
