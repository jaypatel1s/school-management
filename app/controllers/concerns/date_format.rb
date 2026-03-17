# frozen_string_literal: true

# :nodoc:
module DateFormat
  def current_beginning_of_month
    current_date.beginning_of_month
  end

  def current_end_of_month
    current_date.end_of_month
  end

  def current_year
    current_date.year
  end

  def current_month
    current_date.month
  end

  def current_date
    Date.current
  end

  def current_time
    Time.current
  end
end
