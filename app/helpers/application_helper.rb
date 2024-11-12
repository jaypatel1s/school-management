module ApplicationHelper

  def menu_active_class(controller, action = nil)
    if action.present?
      'active' if controller == controller_path && action == action_name
    elsif controller == controller_path
      'active'
    end
  end

  def sub_menu_active_class(controller)
    is_active = controller.include?(controller_path) ? 'active open' : ''
    if is_active.blank?
      is_active = controller.include?("#{controller_path}/#{action_name}") ? 'active open' : ''
    end
    is_active
  end
end
