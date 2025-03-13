class HomeController < ApplicationController
  layout "landing", only: [:index]
  def landing; end
end
