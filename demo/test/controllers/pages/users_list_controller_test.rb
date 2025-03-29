require "test_helper"

class Pages::UsersListControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_users_list_index_url
    assert_response :success
  end
end
