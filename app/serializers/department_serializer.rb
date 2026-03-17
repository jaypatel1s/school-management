# frozen_string_literal: true

class DepartmentSerializer < ApplicationSerializer
  attributes :id, :name, :code, :description, :college_id, :created_at, :updated_at

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :courses_count do |object|
    CountSerializer.new(object.courses)
  end

  attribute :teachers_count do |object|
    CountSerializer.new(object.teachers)
  end

  attribute :students_count do |object|
    Student.joins(:user).where(users: { college_id: object.college_id }).count
  end
end
