# frozen_string_literal: true

class CollegeSerializer < ApplicationSerializer
  attributes :id, :name, :slug, :created_at, :updated_at

  attribute :users_count do |object|
    CountSerializer.new(object.users)
  end

  attribute :students_count do |object|
    CountSerializer.new(object.students)
  end

  attribute :teachers_count do |object|
    CountSerializer.new(object.teachers)
  end

  attribute :departments_count do |object|
    CountSerializer.new(object.departments)
  end

  attribute :courses_count do |object|
    CountSerializer.new(object.courses)
  end

  attribute :books_count do |object|
    CountSerializer.new(object.books)
  end

  attribute :active_payment_gateway do |object|
    JSON.parse(object.active_payment_gateway.to_json) if object.active_payment_gateway
  end
end
