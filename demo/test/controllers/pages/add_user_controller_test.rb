require "test_helper"

class Pages::AddUserControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_add_user_index_url
    assert_response :success
  end
end
