ROLE_PERMISSIONS = {
  principal: {
    dashboard: %i[index],
    users: %i[index new create edit update show destroy import_users],
    sessions: %i[index show],
    departments: %i[index new create edit update destroy],
    csv_files: %i[index new create import_csv export_csv],
    academic_years: %i[index new create edit update destroy],
    courses: %i[index new create edit update show destroy],
    fee_structures: %i[index new create edit update show destroy],
    fee_components: %i[index new create edit update show destroy],
    semesters: %i[index new create edit update show destroy],
    admissions: %i[index show change_status],
    document_types: %i[index new create edit update destroy],
    college_payment_gateways:  %i[index new create edit update destroy]
  },
  teacher: {
    dashboard: %i[index],
    users: %i[index new create edit update show destroy profile_setup],
    departments: %i[index show],
    courses: %i[index show],
    csv_files: %i[index add_csv create_csv import_csv export_csv],
    sessions: %i[index new create edit update destroy show],
    attendances: %i[report],
    assignments: %i[index new create edit update show destroy]
  },
  student: {
    dashboard: %i[index],
    sessions: %i[index show],
    attendances: %i[new create]
  },
  super_admin: {
    admissions: %i[index new create edit update show destroy]
  }
}
