ActiveAdmin.register Subject do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :college_id, :name, :description
  #
  # or
  #
  # permit_params do
  #   permitted = [:college_id, :name, :description]
  #   permitted << :other if params[:action] == 'create' && current_user.principal?
  #   permitted
  # end

end
