# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  attributes :id, :email, :role, :college_id, :profile_setup, :created_at, :updated_at

  attribute :token, if: proc { |_record, params| params[:jwt].present? } do |_object, params|
    params[:jwt]
  end

  attribute :college do |object|
    JSON.parse(object.college.to_json) if object.college
  end

  attribute :student do |object|
    JSON.parse(object.student.to_json) if object.student
  end

  attribute :teacher do |object|
    JSON.parse(object.teacher.to_json) if object.teacher
  end

  attribute :profile_image do |object|
    if object.respond_to?(:profile_image) && object.profile_image.attached?
      profile_image = object.profile_image.as_json
      profile_image&.merge(profile_image_url: object.profile_image.url)
    end
  end
end
