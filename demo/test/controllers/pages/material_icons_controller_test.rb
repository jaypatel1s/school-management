require "test_helper"

class Pages::MaterialIconsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_material_icons_index_url
    assert_response :success
  end
end
