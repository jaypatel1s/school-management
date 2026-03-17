# frozen_string_literal: true

class StudentSerializer < ApplicationSerializer
  attributes :id, :user_id, :college_id, :name, :roll_number, :email, :phone, :address, :created_at, :updated_at

  attribute :user do |object|
    JSON.parse(object.user.to_json) if object.user
  end

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :courses do |object|
    JSON.parse(object.courses.to_json) if object.courses
  end

  attribute :attendances_count do |object|
    CountSerializer.new(object.attendances)
  end

  attribute :book_issues_count do |object|
    CountSerializer.where_count(object.book_issues, return_date: nil)
  end

  attribute :profile_image do |object|
    if object.respond_to?(:profile_image) && object.profile_image.attached?
      profile_image = object.profile_image.as_json
      profile_image&.merge(profile_image_url: object.profile_image.url)
    end
  end
end
