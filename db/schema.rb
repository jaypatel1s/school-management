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

ActiveRecord::Schema[7.1].define(version: 2025_05_02_180639) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
  end

  create_table "fee_types", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "name"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_fee_types_on_college_id"
  end

  create_table "fees", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "department_id", null: false
    t.bigint "course_id", null: false
    t.string "name"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "fee_type_id", null: false
    t.index ["college_id"], name: "index_fees_on_college_id"
    t.index ["course_id"], name: "index_fees_on_course_id"
    t.index ["department_id"], name: "index_fees_on_department_id"
    t.index ["fee_type_id"], name: "index_fees_on_fee_type_id"
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

  create_table "students", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.integer "status"
    t.integer "roll_number"
    t.integer "mobile_no"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
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
    t.bigint "college_id", null: false
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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "assignments", "colleges"
  add_foreign_key "assignments", "courses"
  add_foreign_key "assignments", "departments"
  add_foreign_key "assignments", "teachers"
  add_foreign_key "attendances", "colleges"
  add_foreign_key "attendances", "departments"
  add_foreign_key "attendances", "sessions"
  add_foreign_key "attendances", "students"
  add_foreign_key "courses", "colleges"
  add_foreign_key "courses", "departments"
  add_foreign_key "csv_files", "colleges"
  add_foreign_key "departments", "colleges"
  add_foreign_key "fee_types", "colleges"
  add_foreign_key "fees", "colleges"
  add_foreign_key "fees", "courses"
  add_foreign_key "fees", "departments"
  add_foreign_key "fees", "fee_types"
  add_foreign_key "sessions", "colleges"
  add_foreign_key "sessions", "courses"
  add_foreign_key "sessions", "departments"
  add_foreign_key "sessions", "teachers"
  add_foreign_key "student_courses", "courses"
  add_foreign_key "student_courses", "students"
  add_foreign_key "students", "colleges"
  add_foreign_key "students", "users"
  add_foreign_key "teachers", "colleges"
  add_foreign_key "teachers", "courses"
  add_foreign_key "teachers", "departments"
  add_foreign_key "teachers", "users"
  add_foreign_key "users", "colleges"
  add_foreign_key "web_authn_credentials", "users"
end
