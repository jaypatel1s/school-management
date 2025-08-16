# frozen_string_literal: true

module NavigationHelper
  def path_for(resource)
    if current_user.super_admin?
      send("super_admins_#{resource}_path")
    else
      send("college_#{current_user.role}s_#{resource}_path", college_slug: current_college.slug)
    end
  end
end
