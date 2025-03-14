class LoginController < ApplicationController
    layout "authentication", only: [:index]
  def index
  end
end
