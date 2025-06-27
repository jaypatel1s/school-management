# frozen_string_literal: true

# :nodoc:
class Assignment < ApplicationRecord
  include Sluggable

  belongs_to :teacher
  belongs_to :course
  belongs_to :department
  belongs_to :college
  has_one_attached :file

  validate :file_format

  private

  def file_format
    return unless file.attached?

    if file.content_type != 'application/pdf'
      errors.add(:file, 'must be a PDF file')
    elsif file.blob.byte_size > 500.kilobytes
      errors.add(:file, 'size should be less than or equal to 500KB')
    end
  end
end
