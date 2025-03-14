require "test_helper"

class Pages::OrderTrackingControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_order_tracking_index_url
    assert_response :success
  end
end
