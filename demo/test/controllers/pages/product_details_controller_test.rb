require "test_helper"

class Pages::ProductDetailsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_product_details_index_url
    assert_response :success
  end
end
