# frozen_string_literal: true

class CourseSerializer < ApplicationSerializer
  attributes :id, :name, :code, :description, :credits, :department_id, :college_id, :created_at, :updated_at

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :department do |object|
    JSON.parse(object.department.to_json) if object.department
  end

  attribute :students_count do |object|
    CountSerializer.new(object.students)
  end

  attribute :teachers_count do |object|
    CountSerializer.new(object.teachers)
  end

  attribute :sessions_count do |object|
    CountSerializer.new(object.sessions)
  end
end
