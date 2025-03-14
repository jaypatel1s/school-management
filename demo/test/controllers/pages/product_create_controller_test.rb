require "test_helper"

class Pages::ProductCreateControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_product_create_index_url
    assert_response :success
  end
end
