ROLE_PERMISSIONS = {
  principal: {
    dashboard: %i[index],
    users: %i[index new create edit update show destroy],
    courses: %i[index new create edit update destroy],
    sessions: %i[index],
    departments: %i[index new create edit update destroy],
    marksheets: %i[index show],
    fee_types: %i[index new create edit update show destroy],
    fees: %i[index new create edit update show destroy]
  },
  teacher: {
    dashboard: %i[index],
    users: %i[index new create edit update show destroy profile_setup],
    classrooms: %i[index],
    subjects: %i[index],
    sessions: %i[index new create edit update destroy],
    marksheets: %i[new create index show]
  },
  student: {
    dashboard: %i[index],
    classrooms: %i[index show],
    subjects: %i[index show],
    marksheets: %i[index show]
  }
}
