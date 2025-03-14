require "test_helper"

class Pages::ClipBoardControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_clip_board_index_url
    assert_response :success
  end
end
