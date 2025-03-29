require "test_helper"

class Pages::CategoriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_categories_index_url
    assert_response :success
  end
end
