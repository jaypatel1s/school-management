require "test_helper"

class Pages::AvatarControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_avatar_index_url
    assert_response :success
  end
end
