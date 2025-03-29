require "test_helper"

class Pages::OrderDetailsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_order_details_index_url
    assert_response :success
  end
end
