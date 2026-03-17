# frozen_string_literal: true

class AdmissionSerializer < ApplicationSerializer
  attributes :id, :student_name, :email, :phone, :course_id, :college_id, :status, :created_at, :updated_at

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :course do |object|
    JSON.parse(object.course.to_json) if object.course
  end

  attribute :approved do |object|
    object.status == 'approved'
  end

  attribute :pending do |object|
    object.status == 'pending'
  end

  attribute :rejected do |object|
    object.status == 'rejected'
  end
end
