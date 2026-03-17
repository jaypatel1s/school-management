# frozen_string_literal: true

class FeeSerializer < ApplicationSerializer
  attributes :id, :student_id, :amount, :due_date, :paid_date, :status, :college_id, :created_at, :updated_at

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :student do |object|
    JSON.parse(object.student.to_json) if object.student
  end

  attribute :paid do |object|
    object.status == 'paid'
  end

  attribute :overdue do |object|
    object.due_date < Date.current && object.status != 'paid'
  end

  attribute :overdue_days do |object|
    if object.due_date < Date.current && object.status != 'paid'
      (Date.current - object.due_date).to_i
    else
      0
    end
  end
end
