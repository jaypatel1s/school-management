ROLE_PERMISSIONS = {
  principal: {
    dashboard: %i[index],
    users: %i[index new create edit update show destroy import_users],
    sessions: %i[index show],
    departments: %i[index new create edit update destroy],
    csv_files: %i[index new create import_csv export_csv],
    marksheets: %i[index show],
    fee_types: %i[index new create edit update show destroy],
    courses: %i[index new create edit update show destroy],
    fees: %i[index new create edit update show destroy]
  },
  teacher: {
    dashboard: %i[index],
    users: %i[index new create edit update show destroy profile_setup],
    departments: %i[index show],
    courses: %i[index show],
    csv_files: %i[index add_csv create_csv import_csv export_csv],
    sessions: %i[index new create edit update destroy show],
    attendances: %i[report],
    marksheets: %i[new create index show],
    assignments: %i[index new create edit update show destroy]
  },
  student: {
    dashboard: %i[index],
    marksheets: %i[index show],
    sessions: %i[index show],
    attendances: %i[new create]
  }
}
