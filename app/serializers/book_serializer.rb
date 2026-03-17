# frozen_string_literal: true

class BookSerializer < ApplicationSerializer
  attributes :id, :name, :author, :isbn, :category, :total_copies, :available_copies, :published_year, :slug, :created_at, :updated_at

  attribute :available do |object|
    object.available?
  end

  attribute :issued_copies do |object|
    object.total_copies - object.available_copies
  end

  attribute :book_issues do |object|
    JSON.parse(object.book_issues.includes(:student).to_json)
  end

  attribute :cover_image do |object|
    if object.respond_to?(:cover_image) && object.cover_image.attached?
      cover_image = object.cover_image.as_json
      cover_image&.merge(cover_image_url: object.cover_image.url)
    end
  end
end
