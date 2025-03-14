require "test_helper"

class Drive::FilesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_files_index_url
    assert_response :success
  end
end
