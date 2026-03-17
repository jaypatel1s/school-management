# frozen_string_literal: true

class AssignmentSerializer < ApplicationSerializer
  attributes :id, :title, :description, :due_date, :teacher_id, :college_id, :created_at, :updated_at

  attribute :teacher do |object|
    JSON.parse(object.teacher.to_json) if object.teacher
  end

  attribute :submissions_count do |object|
    CountSerializer.new(object.submissions)
  end

  attribute :pending_submissions_count do |object|
    CountSerializer.where_count(object.submissions, submitted: false)
  end

  attribute :submitted_count do |object|
    CountSerializer.where_count(object.submissions, submitted: true)
  end

  attribute :overdue do |object|
    object.due_date < Date.current
  end
end
