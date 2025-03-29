require "test_helper"

class Drive::MediaControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_media_index_url
    assert_response :success
  end
end
