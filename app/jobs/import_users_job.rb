# frozen_string_literal: true

# :nodoc:
class ImportUsersJob < ApplicationJob
  queue_as :default

  def perform(file_path, college_id)
    Imports::ImportUsersService.new(file_path, college_id).call
  end
end
