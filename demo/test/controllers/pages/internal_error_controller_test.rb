require "test_helper"

class Pages::InternalErrorControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_internal_error_index_url
    assert_response :success
  end
end
