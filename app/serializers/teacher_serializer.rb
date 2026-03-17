# frozen_string_literal: true

class TeacherSerializer < ApplicationSerializer
  attributes :id, :user_id, :college_id, :name, :email, :phone, :address, :department, :created_at, :updated_at

  attribute :user do |object|
    JSON.parse(object.user.to_json) if object.user
  end

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :courses do |object|
    JSON.parse(object.courses.to_json) if object.courses
  end

  attribute :assignments_count do |object|
    CountSerializer.new(object.assignments)
  end

  attribute :profile_image do |object|
    if object.respond_to?(:profile_image) && object.profile_image.attached?
      profile_image = object.profile_image.as_json
      profile_image&.merge(profile_image_url: object.profile_image.url)
    end
  end
end
