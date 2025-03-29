class LogoutController < ApplicationController
    layout "authentication", only: [:index]
  def index
  end
end
