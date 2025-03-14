require "test_helper"

class Pages::UserProfileControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_user_profile_index_url
    assert_response :success
  end
end
