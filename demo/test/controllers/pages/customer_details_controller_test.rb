require "test_helper"

class Pages::CustomerDetailsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_customer_details_index_url
    assert_response :success
  end
end
