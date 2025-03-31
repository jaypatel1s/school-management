# frozen_string_literal: true

# :nodoc:
class HomeController < ApplicationController
  layout 'landing', only: [:index]
  def landing; end
end
