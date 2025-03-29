require "test_helper"

class Pages::SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_search_index_url
    assert_response :success
  end
end
