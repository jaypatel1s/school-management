require "test_helper"

class Drive::TrashControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_trash_index_url
    assert_response :success
  end
end
