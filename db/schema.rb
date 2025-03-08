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

ActiveRecord::Schema[7.0].define(version: 2025_02_08_142942) do
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

  create_table "attendances", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "user_id", null: false
    t.bigint "session_id", null: false
    t.integer "status", default: 0
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_attendances_on_college_id"
    t.index ["session_id"], name: "index_attendances_on_session_id"
    t.index ["user_id"], name: "index_attendances_on_user_id"
  end

  create_table "classrooms", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "name"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_classrooms_on_college_id"
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

  create_table "course_enrollments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "course_id", null: false
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_course_enrollments_on_course_id"
    t.index ["user_id"], name: "index_course_enrollments_on_user_id"
  end

  create_table "courses", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "department_id", null: false
    t.bigint "teacher_id", null: false
    t.string "name"
    t.text "description"
    t.integer "credits"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_courses_on_college_id"
    t.index ["department_id"], name: "index_courses_on_department_id"
    t.index ["teacher_id"], name: "index_courses_on_teacher_id"
  end

  create_table "departments", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.bigint "head_id", null: false
    t.string "name"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_departments_on_college_id"
    t.index ["head_id"], name: "index_departments_on_head_id"
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
    t.datetime "date"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["college_id"], name: "index_sessions_on_college_id"
  end

  create_table "fee_structures", force: :cascade do |t|
    t.string "name"
    t.bigint "college_id", null: false
    t.bigint "classroom_id", null: false
    t.decimal "tuition_fee"
    t.decimal "other_expense"
    t.decimal "total_fee"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["classroom_id"], name: "index_fee_structures_on_classroom_id"
    t.index ["college_id"], name: "index_fee_structures_on_college_id"
  end
  create_table "subjects", force: :cascade do |t|
    t.bigint "college_id", null: false
    t.string "name"
    t.string "description"
    t.string "slug", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["college_id"], name: "index_subjects_on_college_id"
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

  add_foreign_key "attendances", "colleges"
  add_foreign_key "attendances", "sessions"
  add_foreign_key "attendances", "users"
  add_foreign_key "classrooms", "colleges"
  add_foreign_key "course_enrollments", "courses"
  add_foreign_key "course_enrollments", "users"
  add_foreign_key "courses", "colleges"
  add_foreign_key "courses", "departments"
  add_foreign_key "courses", "users", column: "teacher_id"
  add_foreign_key "departments", "colleges"
  add_foreign_key "departments", "users", column: "head_id"
  add_foreign_key "fee_types", "colleges"
  add_foreign_key "fees", "colleges"
  add_foreign_key "fees", "courses"
  add_foreign_key "fees", "departments"
  add_foreign_key "fees", "fee_types"
  add_foreign_key "sessions", "colleges"
  add_foreign_key "subjects", "colleges"
  add_foreign_key "users", "colleges"
  add_foreign_key "web_authn_credentials", "users"
end
