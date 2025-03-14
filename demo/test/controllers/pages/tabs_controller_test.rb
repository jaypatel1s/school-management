require "test_helper"

class Pages::TabsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_tabs_index_url
    assert_response :success
  end
end
