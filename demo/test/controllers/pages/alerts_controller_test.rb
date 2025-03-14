require "test_helper"

class Pages::AlertsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_alerts_index_url
    assert_response :success
  end
end
