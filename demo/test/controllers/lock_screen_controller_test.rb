require "test_helper"

class LockScreenControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get lock_screen_index_url
    assert_response :success
  end
end
