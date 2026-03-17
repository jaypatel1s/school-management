# frozen_string_literal: true

class AttendanceSerializer < ApplicationSerializer
  attributes :id, :student_id, :session_id, :college_id, :date, :present, :notes, :created_at, :updated_at

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :student do |object|
    JSON.parse(object.student.to_json) if object.student
  end

  attribute :session do |object|
    JSON.parse(object.session.to_json) if object.session
  end

  attribute :status do |object|
    object.present ? 'present' : 'absent'
  end
end
