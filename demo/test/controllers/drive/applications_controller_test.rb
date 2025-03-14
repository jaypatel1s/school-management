require "test_helper"

class Drive::ApplicationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_applications_index_url
    assert_response :success
  end
end
