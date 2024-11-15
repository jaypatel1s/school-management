ROLE_PERMISSIONS = {
  principal: {
    dashboard: %i[index],
    users: %i[index new create edit update destroy],
    classrooms: %i[new create edit update destroy],
    subjects: %i[new create edit update destroy],
    marksheets: %i[index show]
  },
  teacher: {
    dashboard: %i[index],
    classrooms: %i[index],
    subjects: %i[index show edit update], # No 'new' permission for teacher
    marksheets: %i[new create index show]
  },
  student: {
    dashboard: %i[index],
    classrooms: %i[index show],
    subjects: %i[index show],
    marksheets: %i[index show]
  }
}
