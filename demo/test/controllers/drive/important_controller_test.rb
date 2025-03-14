require "test_helper"

class Drive::ImportantControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_important_index_url
    assert_response :success
  end
end
