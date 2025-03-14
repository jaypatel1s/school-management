require "test_helper"

class Pages::GoogleMapControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_google_map_index_url
    assert_response :success
  end
end
