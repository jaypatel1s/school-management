require "test_helper"

class Pages::VideosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_videos_index_url
    assert_response :success
  end
end
