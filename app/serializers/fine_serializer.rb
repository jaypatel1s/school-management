# frozen_string_literal: true

class FineSerializer < ApplicationSerializer
  attributes :id, :book_issue_id, :student_id, :college_id, :amount, :reason, :status, :created_at, :updated_at

  attribute :book_issue do |object|
    JSON.parse(object.book_issue.to_json) if object.book_issue
  end

  attribute :student do |object|
    JSON.parse(object.student.to_json) if object.student
  end

  attribute :paid do |object|
    object.status == 'paid'
  end

  attribute :overdue_days do |object|
    object.book_issue&.overdue_days || 0
  end
end
