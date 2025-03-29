require "test_helper"

class Pages::CreateSellerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_create_seller_index_url
    assert_response :success
  end
end
