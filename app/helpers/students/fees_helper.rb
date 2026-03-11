# frozen_string_literal: true

module Students
  module FeesHelper
    def fee_status_class(status)
      case status.to_s
      when 'paid'
        'success'
      when 'partial'
        'warning'
      when 'unpaid'
        'secondary'
      when 'overdue'
        'danger'
      else
        'secondary'
      end
    end
  end
end
