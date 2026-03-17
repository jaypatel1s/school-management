# frozen_string_literal: true

class BookIssueSerializer < ApplicationSerializer
  attributes :id, :book_id, :student_id, :college_id, :issue_date, :due_date, :return_date, :created_at, :updated_at

  attribute :returned do |object|
    object.returned?
  end

  attribute :overdue_days do |object|
    object.overdue_days
  end

  attribute :overdue do |object|
    object.overdue_days > 0
  end

  attribute :book do |object|
    JSON.parse(object.book.to_json) if object.book
  end

  attribute :student do |object|
    JSON.parse(object.student.to_json) if object.student
  end

  attribute :fine do |object|
    JSON.parse(object.fine.to_json) if object.fine
  end

  attribute :can_renew do |object|
    !object.returned? && object.overdue_days <= 0
  end
end
