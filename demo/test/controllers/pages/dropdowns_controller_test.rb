require "test_helper"

class Pages::DropdownsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_dropdowns_index_url
    assert_response :success
  end
end
