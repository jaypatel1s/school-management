# frozen_string_literal: true

module Principals
  # :nodoc:
  class CsvFilesController < BaseController
    def index
      @csv_files = current_college.csv_files.all
    end

    def new
      @csv_file = current_college.csv_files.new
    end

    def create
      @csv_file = current_college.csv_files.new(csv_file_params)
      if @csv_file.save
        flash[:notice] = 'CSV record added successfully!'
        redirect_to college_principals_csv_files_path(current_college.slug)
      else
        flash[:alert] = @csv_file.errors.full_messages
        render :new
      end
    end

    def import_csv
      if params[:import_type] == 'server'
        generate_csv_from_server
      elsif params[:import_type] == 'local'
        upload_and_import_csv
      else
        flash[:alert] = 'Invalid import type!'
        redirect_to college_principals_csv_files_path(current_college.slug)
      end
    end

    def export_csv
      @csv_files = current_college.csv_files.all
      csv_data = CSV.generate(headers: true) do |csv|
        csv << %w[name email password password_confirmation role]  # Column headers
        @csv_files.each do |csv_file|
          csv << [csv_file.name, csv_file.email, csv_file.password, csv_file.password, csv_file.role]
        end
      end

      send_data csv_data, filename: "users-#{Time.zone.today}.csv", type: 'text/csv'
    end

    private

    def generate_csv_from_server
      csv_data = CSV.generate(headers: true) do |csv|
        csv << %w[name email password password_confirmation role]  # Column headers

        CsvFile.find_each do |csv_file|
          csv << [csv_file.name, csv_file.email, csv_file.password, csv_file.password, csv_file.role]
        end
      end

      temp_file = Tempfile.new(['csv_export', '.csv'])
      temp_file.write(csv_data)
      temp_file.rewind

      # Save the file in public directory (adjust path as needed)
      generated_file_path = Rails.public_path.join('uploads', 'csv_export', "#{current_college.name}-users.csv")
      File.write(generated_file_path, temp_file.read)

      # Send the file path to JavaScript
      render json: { generated_csv_url: "/uploads/csv_export/#{current_college.name}-users.csv" }

      # Clean up temp file
      temp_file.close
      temp_file.unlink
    end

    def upload_and_import_csv
      file = params[:csv_file]

      unless file&.content_type == 'text/csv' || File.extname(file.original_filename) == '.csv'
        flash[:alert] = 'Only CSV files are allowed.'
        redirect_to request.referer || root_path and return
      end

      temp_file = Rails.root.join('tmp', "import_users_#{SecureRandom.hex}.csv")
      File.write(temp_file, file.read)

      ImportUsersJob.perform_later(temp_file.to_s, current_college.id)

      flash[:success] = 'CSV upload started. Users will be imported shortly.'
      redirect_to college_principals_csv_files_path(current_college.slug)
    end

    def csv_file_params
      params.require(:csv_file).permit(:name, :email, :role, :password, :password_confirmation)
    end
  end
end
