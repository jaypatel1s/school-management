# frozen_string_literal: true

# :nodoc:
module Sluggable
  extend ActiveSupport::Concern

  included do
    before_save :set_slug_from_name
  end

  private

  def set_slug_from_name
    return if slug.present? || name.blank?

    self.slug = generate_slug(name)

    counter = 1
    while self.class.where(slug:).where.not(id:).exists?
      self.slug = "#{name.parameterize[0, 97]}-#{counter}"
      counter += 1
    end
  end

  def generate_slug(name)
    if name.match(/[[:alnum:]]/).nil?
      SecureRandom.hex(5)
    else
      name.parameterize[0, 100]
    end
  end
end
