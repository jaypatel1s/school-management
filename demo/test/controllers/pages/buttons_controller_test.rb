require "test_helper"

class Pages::ButtonsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_buttons_index_url
    assert_response :success
  end
end
