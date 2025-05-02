ROLE_PERMISSIONS = {
  principal: {
    dashboard: %i[index],
    users: %i[index new create edit update show destroy import_users],
    sessions: %i[index show],
    departments: %i[index new create edit update destroy],
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
    sessions: %i[index new create edit update destroy show],
    attendances: %i[index new create edit update destroy show report],
    marksheets: %i[new create index show]
  },
  student: {
    dashboard: %i[index],
    marksheets: %i[index show],
    sessions: %i[index show],
    attendances: %i[new create]
  }
}
