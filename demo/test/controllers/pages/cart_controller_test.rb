require "test_helper"

class Pages::CartControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_cart_index_url
    assert_response :success
  end
end
