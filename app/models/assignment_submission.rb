# frozen_string_literal: true

# :nodoc:
class AssignmentSubmission < ApplicationRecord
  belongs_to :assignment
  belongs_to :student
  has_one_attached :submission_file
  
  validates :assignment_id, uniqueness: { scope: :student_id }
  validate :submission_file_format
  
  before_create :set_submitted_at
  
  enum :status, { submitted: 0, graded: 1, returned: 2 }
  
  private
  
  def submission_file_format
    return unless submission_file.attached?
    
    allowed_types = ['application/pdf', 'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'text/plain']
    
    unless allowed_types.include?(submission_file.content_type)
      errors.add(:submission_file, 'must be PDF, Word, or text file')
    end
    
    if submission_file.blob.byte_size > 2.megabytes
      errors.add(:submission_file, 'size should be less than 2MB')
    end
  end
  
  def set_submitted_at
    self.submitted_at ||= Time.current
  end
end
