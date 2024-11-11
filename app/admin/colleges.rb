ActiveAdmin.register College do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :name, :address, :landmark, :pincode, :state, :city, :country
  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :address, :landmark, :pincode, :state, :city, :country]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form do |f|
    f.semantic_errors
    f.inputs 'College' do
      f.input :name
      f.input :address
      f.input :landmark
      f.input :pincode
      f.input :state
      f.input :city
      f.input :country, as: :select, collection: ISO3166::Country.all.map { |c| [c.translations['en'], c.alpha2] }
    end
    f.actions
  end
end
