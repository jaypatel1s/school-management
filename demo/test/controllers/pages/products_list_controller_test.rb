require "test_helper"

class Pages::ProductsListControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_products_list_index_url
    assert_response :success
  end
end
