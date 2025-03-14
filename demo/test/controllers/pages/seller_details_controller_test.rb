require "test_helper"

class Pages::SellerDetailsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_seller_details_index_url
    assert_response :success
  end
end
