ROLE_PERMISSIONS = {
  principal: {
    dashboard: %i[index],
    users: %i[index new create edit update show destroy new_webauthn_registration create_webauthn_registration],
    courses: %i[index new create edit update destroy],
    sessions: %i[index],
    departments: %i[index new create edit update destroy],
    marksheets: %i[index show]
  },
  teacher: {
    users: %i[index],
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
