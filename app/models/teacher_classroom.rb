class TeacherClassroom < ApplicationRecord
  belongs_to :teacher_subject
  belongs_to :classroom
  belongs_to :college

end
