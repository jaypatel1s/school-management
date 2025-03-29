require "test_helper"

class Pages::ProductsGridControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_products_grid_index_url
    assert_response :success
  end
end
