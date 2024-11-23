ROLE_PERMISSIONS = {
  principal: {
    dashboard: %i[index],
    users: %i[index new create edit update show destroy],
    classrooms: %i[index new create edit update destroy],
    sessions: %i[index],
    subjects: %i[index new create edit update destroy],
    marksheets: %i[index show]
  },
  teacher: {
    dashboard: %i[index],
    users: %i[index new create edit update show destroy profile_setup],
    classrooms: %i[index],
    subjects: %i[index],
    sessions: %i[index],
    marksheets: %i[new create index show]
  },
  student: {
    dashboard: %i[index],
    classrooms: %i[index show],
    subjects: %i[index show],
    marksheets: %i[index show]
  }
}
