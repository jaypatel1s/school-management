module ApplicationHelper
    def active_for(*paths)
        'active' if paths.any? { |path| current_page?(path) }
    end
end
