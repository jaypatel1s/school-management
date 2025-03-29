require "test_helper"

class Pages::NotFoundErrorControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_not_found_error_index_url
    assert_response :success
  end
end
