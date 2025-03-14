require "test_helper"

class Pages::OrdersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_orders_index_url
    assert_response :success
  end
end
