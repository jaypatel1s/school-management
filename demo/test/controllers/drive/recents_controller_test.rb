require "test_helper"

class Drive::RecentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_recents_index_url
    assert_response :success
  end
end
