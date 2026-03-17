# frozen_string_literal: true

class ExamSerializer < ApplicationSerializer
  attributes :id, :title, :description, :exam_date, :total_marks, :passing_marks, :course_id, :college_id, :created_at, :updated_at

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :course do |object|
    JSON.parse(object.course.to_json) if object.course
  end

  attribute :results_count do |object|
    CountSerializer.new(object.results)
  end

  attribute :passed_count do |object|
    CountSerializer.where_count(object.results.where('marks >= ?', object.passing_marks))
  end

  attribute :failed_count do |object|
    CountSerializer.where_count(object.results.where('marks < ?', object.passing_marks))
  end

  attribute :completed do |object|
    object.exam_date < Date.current
  end
end
