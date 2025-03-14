require "test_helper"

class Pages::CreateOrderControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_create_order_index_url
    assert_response :success
  end
end
