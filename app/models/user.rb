class User < ApplicationRecord
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable, :confirmable, :timeoutable, :trackable
  belongs_to :college
  enum role: { principal: 0, teacher: 1, student: 2 }

  def admin?
    %w[principal teacher].include?(role)
  end

  def user?
    %w[student].include?(role)
  end
end
