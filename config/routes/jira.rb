# frozen_string_literal: true

# :nodoc:
namespace :jira do
  devise_scope :user do
    authenticated :user do
      root to: 'dashboard#index'
    end
  end
  resources :sites, param: :slug do
    member do
      get :sync, param: :slug
      put :change_status
    end
    collection do
      get 'list_of_deleted_site', to: 'sites#list_of_deleted_site', as: :list_of_deleted_site
      get 'validate_token', to: 'sites#validate_token', as: :validate_token
      put :update_session
    end
    resources :filters, param: :slug, concerns: :revisions_rollback do
      collection do
        post :project_filters
        patch :update_project_filters
        get :copy
      end
      member do
        get :filter_projects
        post :create_filter_project
        delete :remove_filter_project
      end
    end
    resources :projects, param: :slug, concerns: :revisions_rollback do
      collection do
        get :copy
        get 'validate-key', to: 'projects#validate_key', as: :validate_key
        get :key_exists
      end
      member do
        get :project_filters
        post :create_project_filter
        delete :remove_project_filter
        get :project_leads
        get :project_schemes
        patch :update_project_schemes
        delete :remove_project_schemes
        patch :restore
        delete :delete_permanently
      end
    end
    resources :boards, param: :slug do
      collection do
        get :site_access
      end
    end
    namespace :issues do
      resources :issue_types, param: :slug, concerns: :revisions_rollback do
        collection do
          get :copy
        end
      end
      resources :screens, param: :slug, concerns: :revisions_rollback do
        member do
          get :screen_tabs
          post :add_screen_tab
          post :add_screen_tab_field
          delete :remove_screen_tab
          delete :remove_screen_tab_field
        end
        collection do
          get :copy
        end
      end
      resources :screen_schemes, param: :slug, concerns: :revisions_rollback do
        member do
          get :screen_issue_operations
          post :create_screen_scheme
          delete :remove_screen_scheme
        end
        collection do
          get :copy
        end
      end
      resources :issue_type_screen_schemes, param: :slug, concerns: :revisions_rollback do
        collection do
          get :copy
        end
        member do
          get :project_issue_type_screen
          post :project_issue_type_screen_scheme
          get :screen_scheme_issue_type_show
          post :append_mapping
          delete :remove_mapping
        end
      end
      resources :issue_type_schemes, param: :slug, concerns: :revisions_rollback do
        collection do
          get :copy
        end
        member do
          get :project_issue_type
          post :project_issue_type_scheme
          get :issue_type_issue_type_schemes
          post :append_mapping
          delete :remove_mapping
        end
      end
      resources :custom_fields, param: :slug, concerns: :revisions_rollback do
        collection do
          get :copy
          get :searcher_keys
        end
      end
      resources :field_configurations, param: :slug, concerns: :revisions_rollback do
        collection do
          get :copy
          get :screen_tabs
        end
        member do
          get :screen_and_screen_tabs
          post :add_screen_tab_field
          delete :remove_screen_tab_field
        end
      end
      resources :field_configuration_schemes, param: :slug, concerns: :revisions_rollback do
        member do
          get :project
          post :add_project
          get :field_field_configuration_scheme
          post :create_field_configuration_scheme
          delete :remove_field_configuration_scheme
        end
        collection do
          get :copy
        end
      end
      resources :priorities, param: :slug, concerns: :revisions_rollback do
        collection do
          get :copy
        end
      end
      resources :priority_schemes, param: :slug, concerns: :revisions_rollback do
        member do
          get :priority_priority_schemes
          get :project_priority_schemes
          post :add_project
          delete :remove_project
          post :create_priority
          delete :remove_priority
        end
        collection do
          get :copy
        end
      end
      resources :statuses, param: :slug, concerns: :revisions_rollback do
        collection do
          get :copy
        end
      end
      resources :resolutions, param: :slug, concerns: :revisions_rollback do
        collection do
          get :copy
        end
        get 'set_default', to: 'resolutions#set_default', as: :set_default
      end
      resources :notification_schemes, param: :slug, concerns: :revisions_rollback do
        member do
          get :notification_events_and_scheme_notification
          get :project_notification
          post :project_notification_scheme
          get :notification_details
          get :add_event
          post :create_notification
          delete :notification_destroy
        end
        collection do
          get :copy
        end
      end
      resources :issue_security_schemes, param: :slug, concerns: :revisions_rollback do
        collection do
          get :copy
        end
        member do
          get :issue_security_levels_and_members
        end
        resources :issue_security_levels, param: :slug, concerns: :revisions_rollback do
          collection do
            get :copy
          end
          get 'set_default', to: 'issue_security_levels#set_default', as: :set_default
          resources :issue_security_members, param: :slug
        end
      end
      resources :workflows, param: :slug, concerns: :revisions_rollback do
        collection do
          get :status
          put :update_status
        end
        member do
          get :remove_transition
          get :status_and_transitions
          post :add_workflow_status
          post :add_workflow_transition
          delete :remove_workflow_status
          delete :remove_workflow_transition
          post :remove_workflow_status_or_transitions
        end
        resources :workflow_status_properties, param: :slug
        resources :workflow_transition_properties, param: :slug
        resources :workflow_transitions, param: :slug do
          collection do
            get :transition_rule_keys
            get :workflow_rule_transitions
            get :custom_field_types
          end
          resources :workflow_transition_validators do
            collection do
              post :add_workflow_validations
            end
            member do
              delete :remove_workflow_validations
            end
          end
          resources :workflow_transition_restrictions do
            collection do
              post :add_workflow_restrictions
            end
            member do
              delete :remove_workflow_restrictions
            end
          end
          resources :workflow_transition_perform_actions do
            collection do
              post :add_workflow_perform_actions
            end
            member do
              delete :remove_workflow_perform_actions
            end
          end
        end
      end
      resources :workflow_schemes, param: :slug, concerns: :revisions_rollback do
        collection do
          get :copy
        end
        member do
          get :workflow_issue_types
          post :add_worklow_and_issue_types
        end
      end
      namespace :issue_attributes do
        resources :permission_schemes, param: :slug, concerns: :revisions_rollback do
          member do
            get :permission_and_grant
            get :add_permission
            get :project_permissions
            post :add_project_permissions
            get :new_permission
            get :find_permission
            post :create_grant_permission
            delete :destroy_permission
          end
          collection do
            get :copy
          end
        end
      end
    end
    namespace :settings do
      resources :events, param: :slug
      resources :application_roles, param: :slug
      resources :group_user_pickers, param: :slug
      resources :permissions, param: :slug
      resources :project_roles, param: :slug
    end

    resources :project_leads, param: :slug do
      member do
        get :project_details
        patch :restore
      end
      collection do
        post :bulk_action
      end
    end
    resources :clean_sites, param: :slug
    resources :site_bearer_tokens, param: :slug
    resources :project_categories, param: :slug, concerns: :revisions_rollback do
      collection do
        get :copy
      end
    end
    get 'fetch_site_projects', to: 'projects#fetch_list', as: :fetch_site_projects
    get 'fetch_data_project', to: 'projects#fetch_data', as: :fetch_data_project
    get 'fetch_site_filters', to: 'filters#fetch_list', as: :fetch_site_filters
    get 'fetch_data_filter', to: 'filters#fetch_data', as: :fetch_data_filter
    get 'template_key', to: 'projects#template_key'
  end
  resources :error_logs
  get 'compare/:module_name', to: 'compare#index', as: 'compare_with_module'
  get 'compare', to: 'compare#index', as: 'compare'
  get 'list_compare/:module_name', to: 'compare#list', as: 'list_compare_with_module'
  get 'list_compare', to: 'compare#list', as: 'list_compare'
  get 'fetch_sorted_records', to: 'compare#fetch_sorted_records', as: 'compare_fetch_sorted_records'
  get 'site_wise_records', to: 'compare#site_wise_records', as: 'compare_site_wise_records'
end
