# frozen_string_literal: true

module Imports
  # :nodoc:
  class ImportUsersService
    def initialize(file_path, college_id)
      @file_path = file_path
      @college_id = college_id
      @users = []
      @csv_user_records = []
    end

    def call
      import_users
      trigger_confirmation_emails
    ensure
      cleanup_file
    end

    private

    def import_users
      CSV.foreach(@file_path, headers: true).with_index do |row, index|
        next if row['email'].blank?

        unless CsvFile.exists?(email: row['email'], college_id: @college_id)
          @csv_user_records << CsvFile.new(
            name: row['name'],
            email: row['email'],
            role: row['role'],
            password: row['password'],
            college_id: @college_id
          )
        end

        unless User.exists?(email: row['email'], college_id: @college_id)
          @users << User.new(
            name: row['name'],
            email: row['email'],
            password: row['password'],
            password_confirmation: row['password'],
            role: row['role'],
            slug: row['name'].present? ? "#{row['name'].parameterize}-#{index}" : SecureRandom.hex(4),
            college_id: @college_id
          )
        end
      end
      CsvFile.import(@csv_user_records, validate: false) if @csv_user_records.any?
      User.import(@users, validate: false) if @users.any?
    end

    def trigger_confirmation_emails
      @users.each do |user|
        user.send_confirmation_instructions if user.valid? && !user.confirmed?
      end
    end

    def cleanup_file
      FileUtils.rm_f(@file_path)
    end
  end
end
