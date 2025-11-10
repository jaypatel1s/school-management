# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_11_10_063434) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "academic_years", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "name"
    t.date "start_date"
    t.date "end_date"
    t.boolean "current"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_academic_years_on_college_id"
    t.index ["name", "college_id"], name: "index_academic_years_on_name_and_college_id", unique: true
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "admission_applications", force: :cascade do |t|
    t.bigint "admission_id", null: false
    t.bigint "college_id", null: false
    t.bigint "department_id", null: false
    t.bigint "course_id", null: false
    t.string "status", default: "document_upload_pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "application_number"
    t.string "temporary_token"
    t.string "email"
    t.string "phone"
    t.string "name"
    t.string "slug"
    t.datetime "expires_at"
    t.bigint "fee_structure_id"
    t.boolean "documents_verified", default: false, null: false
    t.index ["admission_id"], name: "index_admission_applications_on_admission_id"
    t.index ["college_id"], name: "index_admission_applications_on_college_id"
    t.index ["course_id"], name: "index_admission_applications_on_course_id"
    t.index ["department_id"], name: "index_admission_applications_on_department_id"
    t.index ["fee_structure_id"], name: "index_admission_applications_on_fee_structure_id"
  end

  create_table "admission_college_actives", force: :cascade do |t|
    t.bigint "admission_id", null: false
    t.bigint "college_id", null: false
    t.boolean "active"
    t.datetime "activation_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admission_id", "college_id"], name: "index_admission_college_actives_on_admission_id_and_college_id", unique: true
    t.index ["admission_id"], name: "index_admission_college_actives_on_admission_id"
    t.index ["college_id"], name: "index_admission_college_actives_on_college_id"
  end

  create_table "admission_documents", force: :cascade do |t|
    t.bigint "document_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "admission_application_id", null: false
    t.boolean "verified", default: false, null: false
    t.index ["admission_application_id"], name: "index_admission_documents_on_admission_application_id"
    t.index ["document_type_id"], name: "index_admission_documents_on_document_type_id"
  end

  create_table "admission_payments", force: :cascade do |t|
    t.bigint "admission_application_id", null: false
    t.string "transaction_id"
    t.string "payment_status"
    t.datetime "paid_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "amount", precision: 10, scale: 2, default: "0.0", null: false
    t.integer "payment_mode", default: 0, null: false
    t.bigint "semester_id", null: false
    t.index ["admission_application_id"], name: "index_admission_payments_on_admission_application_id"
    t.index ["semester_id"], name: "index_admission_payments_on_semester_id"
  end

  create_table "admission_receipts", force: :cascade do |t|
    t.bigint "student_fee_id", null: false
    t.bigint "admission_payment_id", null: false
    t.string "receipt_number", null: false
    t.string "pdf_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admission_payment_id"], name: "index_admission_receipts_on_admission_payment_id"
    t.index ["student_fee_id"], name: "index_admission_receipts_on_student_fee_id"
  end

  create_table "admissions", force: :cascade do |t|
    t.string "status", default: "pending"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.datetime "start_date"
    t.datetime "end_date"
    t.datetime "closed_at"
  end

  create_table "assignments", force: :cascade do |t|
    t.bigint "teacher_id", null: false
    t.bigint "course_id", null: false
    t.bigint "department_id", null: false
    t.bigint "college_id", null: false
    t.string "slug", limit: 255, null: false
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_assignments_on_college_id"
    t.index ["course_id"], name: "index_assignments_on_course_id"
    t.index ["department_id"], name: "index_assignments_on_department_id"
    t.index ["teacher_id"], name: "index_assignments_on_teacher_id"
  end

  create_table "attendances", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "department_id", null: false
    t.bigint "session_id", null: false
    t.bigint "student_id", null: false
    t.integer "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_attendances_on_college_id"
    t.index ["department_id"], name: "index_attendances_on_department_id"
    t.index ["session_id"], name: "index_attendances_on_session_id"
    t.index ["student_id"], name: "index_attendances_on_student_id"
  end

  create_table "book_issues", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "student_id", null: false
    t.bigint "book_id", null: false
    t.date "issue_date"
    t.date "due_date"
    t.date "return_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_book_issues_on_book_id"
    t.index ["college_id"], name: "index_book_issues_on_college_id"
    t.index ["student_id"], name: "index_book_issues_on_student_id"
  end

  create_table "books", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "title"
    t.string "author"
    t.string "isbn"
    t.integer "total_copies"
    t.integer "available_copies"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_books_on_college_id"
  end

  create_table "college_payment_gateways", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "name", null: false
    t.string "api_key"
    t.string "api_secret"
    t.string "merchant_id"
    t.jsonb "options", default: {}
    t.boolean "active", default: true
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id", "name"], name: "index_college_payment_gateways_on_college_id_and_name", unique: true
    t.index ["college_id"], name: "index_college_payment_gateways_on_college_id"
  end

  create_table "colleges", force: :cascade do |t|
    t.string "name"
    t.text "address"
    t.text "landmark"
    t.string "pincode"
    t.string "state"
    t.string "city"
    t.string "country"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "course_semesters", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.bigint "academic_year_id", null: false
    t.bigint "semester_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["academic_year_id"], name: "index_course_semesters_on_academic_year_id"
    t.index ["course_id"], name: "index_course_semesters_on_course_id"
    t.index ["semester_id"], name: "index_course_semesters_on_semester_id"
  end

  create_table "courses", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "department_id", null: false
    t.string "name"
    t.text "description"
    t.integer "credits"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_courses_on_college_id"
    t.index ["department_id"], name: "index_courses_on_department_id"
    t.index ["name", "college_id"], name: "index_courses_on_name_and_college_id", unique: true
  end

  create_table "csv_files", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "role"
    t.string "password"
    t.bigint "college_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_csv_files_on_college_id"
    t.index ["email"], name: "index_csv_files_on_email", unique: true
  end

  create_table "departments", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "name"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_departments_on_college_id"
    t.index ["name", "college_id"], name: "index_departments_on_name_and_college_id", unique: true
  end

  create_table "document_types", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "name"
    t.boolean "required"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_document_types_on_college_id"
    t.index ["name", "college_id"], name: "index_document_types_on_name_and_college_id", unique: true
  end

  create_table "exam_attendances", force: :cascade do |t|
    t.bigint "exam_id", null: false
    t.bigint "student_id", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exam_id", "student_id"], name: "index_exam_attendances_on_exam_id_and_student_id", unique: true
    t.index ["exam_id"], name: "index_exam_attendances_on_exam_id"
    t.index ["student_id"], name: "index_exam_attendances_on_student_id"
  end

  create_table "exam_results", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "exam_id", null: false
    t.bigint "student_id", null: false
    t.integer "marks_obtained"
    t.string "grade"
    t.boolean "passed", default: false
    t.bigint "evaluated_by_teacher_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "exam_attendance_id"
    t.index ["college_id"], name: "index_exam_results_on_college_id"
    t.index ["evaluated_by_teacher_id"], name: "index_exam_results_on_evaluated_by_teacher_id"
    t.index ["exam_attendance_id"], name: "index_exam_results_on_exam_attendance_id"
    t.index ["exam_id", "student_id"], name: "index_exam_results_on_exam_id_and_student_id", unique: true
    t.index ["exam_id"], name: "index_exam_results_on_exam_id"
    t.index ["student_id"], name: "index_exam_results_on_student_id"
  end

  create_table "exams", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "academic_year_id", null: false
    t.bigint "semester_id", null: false
    t.bigint "course_id", null: false
    t.string "name", null: false
    t.datetime "scheduled_at", null: false
    t.integer "max_marks", default: 100
    t.integer "exam_type", default: 0
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["academic_year_id"], name: "index_exams_on_academic_year_id"
    t.index ["college_id"], name: "index_exams_on_college_id"
    t.index ["course_id"], name: "index_exams_on_course_id"
    t.index ["semester_id"], name: "index_exams_on_semester_id"
  end

  create_table "fee_components", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "name"
    t.text "description"
    t.decimal "amount"
    t.bigint "fee_structure_id", null: false
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "semester_id", null: false
    t.index ["college_id"], name: "index_fee_components_on_college_id"
    t.index ["fee_structure_id"], name: "index_fee_components_on_fee_structure_id"
    t.index ["semester_id"], name: "index_fee_components_on_semester_id"
  end

  create_table "fee_payments", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "student_fee_id", null: false
    t.decimal "amount"
    t.date "payment_date"
    t.string "payment_method"
    t.string "transaction_reference"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_fee_payments_on_college_id"
    t.index ["student_fee_id"], name: "index_fee_payments_on_student_fee_id"
  end

  create_table "fee_structures", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "name"
    t.text "description"
    t.decimal "total_amount"
    t.bigint "academic_year_id", null: false
    t.bigint "department_id", null: false
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["academic_year_id"], name: "index_fee_structures_on_academic_year_id"
    t.index ["college_id"], name: "index_fee_structures_on_college_id"
    t.index ["department_id"], name: "index_fee_structures_on_department_id"
  end

  create_table "fines", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "student_id", null: false
    t.bigint "book_issue_id", null: false
    t.decimal "amount", precision: 8, scale: 2, default: "0.0"
    t.string "reason"
    t.boolean "paid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_issue_id"], name: "index_fines_on_book_issue_id"
    t.index ["college_id"], name: "index_fines_on_college_id"
    t.index ["student_id"], name: "index_fines_on_student_id"
  end

  create_table "semesters", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "name"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_semesters_on_college_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "department_id", null: false
    t.bigint "course_id", null: false
    t.bigint "teacher_id", null: false
    t.datetime "date", null: false
    t.string "name", null: false
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_sessions_on_college_id"
    t.index ["course_id"], name: "index_sessions_on_course_id"
    t.index ["department_id"], name: "index_sessions_on_department_id"
    t.index ["teacher_id"], name: "index_sessions_on_teacher_id"
  end

  create_table "student_courses", force: :cascade do |t|
    t.bigint "student_id", null: false
    t.bigint "course_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_student_courses_on_course_id"
    t.index ["student_id"], name: "index_student_courses_on_student_id"
  end

  create_table "student_fees", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "student_id", null: false
    t.bigint "fee_structure_id", null: false
    t.string "status"
    t.decimal "amount_paid"
    t.date "due_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "admission_application_id", null: false
    t.bigint "semester_id", null: false
    t.decimal "total_amount", precision: 12, scale: 2, default: "0.0"
    t.index ["admission_application_id"], name: "index_student_fees_on_admission_application_id"
    t.index ["college_id"], name: "index_student_fees_on_college_id"
    t.index ["fee_structure_id"], name: "index_student_fees_on_fee_structure_id"
    t.index ["semester_id"], name: "index_student_fees_on_semester_id"
    t.index ["student_id"], name: "index_student_fees_on_student_id"
  end

  create_table "students", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.integer "status"
    t.string "roll_number"
    t.integer "mobile_no"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.bigint "admission_application_id"
    t.index ["admission_application_id"], name: "index_students_on_admission_application_id"
    t.index ["college_id"], name: "index_students_on_college_id"
    t.index ["user_id"], name: "index_students_on_user_id"
  end

  create_table "teachers", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "department_id", null: false
    t.bigint "course_id", null: false
    t.string "specialization"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["college_id"], name: "index_teachers_on_college_id"
    t.index ["course_id"], name: "index_teachers_on_course_id"
    t.index ["department_id"], name: "index_teachers_on_department_id"
    t.index ["user_id"], name: "index_teachers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.bigint "college_id"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name"
    t.integer "role", default: 0
    t.integer "contact_no"
    t.text "description"
    t.string "slug", limit: 255, null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "profile_setup", default: false
    t.index ["college_id"], name: "index_users_on_college_id"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  create_table "web_authn_credentials", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "external_id"
    t.string "unique"
    t.string "true"
    t.string "public_key"
    t.integer "sign_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_web_authn_credentials_on_user_id"
  end

  add_foreign_key "academic_years", "colleges"
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "admission_applications", "admissions"
  add_foreign_key "admission_applications", "colleges"
  add_foreign_key "admission_applications", "courses"
  add_foreign_key "admission_applications", "departments"
  add_foreign_key "admission_applications", "fee_structures"
  add_foreign_key "admission_college_actives", "admissions"
  add_foreign_key "admission_college_actives", "colleges"
  add_foreign_key "admission_documents", "admission_applications"
  add_foreign_key "admission_documents", "document_types"
  add_foreign_key "admission_payments", "admission_applications"
  add_foreign_key "admission_payments", "semesters"
  add_foreign_key "admission_receipts", "admission_payments"
  add_foreign_key "admission_receipts", "student_fees"
  add_foreign_key "assignments", "colleges"
  add_foreign_key "assignments", "courses"
  add_foreign_key "assignments", "departments"
  add_foreign_key "assignments", "teachers"
  add_foreign_key "attendances", "colleges"
  add_foreign_key "attendances", "departments"
  add_foreign_key "attendances", "sessions"
  add_foreign_key "attendances", "students"
  add_foreign_key "book_issues", "books"
  add_foreign_key "book_issues", "colleges"
  add_foreign_key "book_issues", "students"
  add_foreign_key "books", "colleges"
  add_foreign_key "college_payment_gateways", "colleges"
  add_foreign_key "course_semesters", "academic_years"
  add_foreign_key "course_semesters", "courses"
  add_foreign_key "course_semesters", "semesters"
  add_foreign_key "courses", "colleges"
  add_foreign_key "courses", "departments"
  add_foreign_key "csv_files", "colleges"
  add_foreign_key "departments", "colleges"
  add_foreign_key "document_types", "colleges"
  add_foreign_key "exam_attendances", "exams"
  add_foreign_key "exam_attendances", "students"
  add_foreign_key "exam_results", "colleges"
  add_foreign_key "exam_results", "exam_attendances"
  add_foreign_key "exam_results", "exams"
  add_foreign_key "exam_results", "students"
  add_foreign_key "exam_results", "teachers", column: "evaluated_by_teacher_id"
  add_foreign_key "exams", "academic_years"
  add_foreign_key "exams", "colleges"
  add_foreign_key "exams", "courses"
  add_foreign_key "exams", "semesters"
  add_foreign_key "fee_components", "colleges"
  add_foreign_key "fee_components", "fee_structures"
  add_foreign_key "fee_components", "semesters"
  add_foreign_key "fee_payments", "colleges"
  add_foreign_key "fee_payments", "student_fees"
  add_foreign_key "fee_structures", "academic_years"
  add_foreign_key "fee_structures", "colleges"
  add_foreign_key "fee_structures", "departments"
  add_foreign_key "fines", "book_issues"
  add_foreign_key "fines", "colleges"
  add_foreign_key "fines", "students"
  add_foreign_key "semesters", "colleges"
  add_foreign_key "sessions", "colleges"
  add_foreign_key "sessions", "courses"
  add_foreign_key "sessions", "departments"
  add_foreign_key "sessions", "teachers"
  add_foreign_key "student_courses", "courses"
  add_foreign_key "student_courses", "students"
  add_foreign_key "student_fees", "admission_applications"
  add_foreign_key "student_fees", "colleges"
  add_foreign_key "student_fees", "fee_structures"
  add_foreign_key "student_fees", "semesters"
  add_foreign_key "student_fees", "students"
  add_foreign_key "students", "admission_applications"
  add_foreign_key "students", "colleges"
  add_foreign_key "students", "users"
  add_foreign_key "teachers", "colleges"
  add_foreign_key "teachers", "courses"
  add_foreign_key "teachers", "departments"
  add_foreign_key "teachers", "users"
  add_foreign_key "users", "colleges"
  add_foreign_key "web_authn_credentials", "users"
end
