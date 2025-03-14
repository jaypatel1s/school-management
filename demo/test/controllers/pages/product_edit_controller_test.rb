require "test_helper"

class Pages::ProductEditControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_product_edit_index_url
    assert_response :success
  end
end
