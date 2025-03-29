require "test_helper"

class Pages::WidgetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_widgets_index_url
    assert_response :success
  end
end
