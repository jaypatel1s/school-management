# frozen_string_literal: true

class SessionSerializer < ApplicationSerializer
  attributes :id, :name, :course_id, :college_id, :start_time, :end_time, :room, :created_at, :updated_at

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :course do |object|
    JSON.parse(object.course.to_json) if object.course
  end

  attribute :attendances_count do |object|
    CountSerializer.new(object.attendances)
  end

  attribute :present_count do |object|
    CountSerializer.where_count(object.attendances, present: true)
  end

  attribute :absent_count do |object|
    CountSerializer.where_count(object.attendances, present: false)
  end
end
