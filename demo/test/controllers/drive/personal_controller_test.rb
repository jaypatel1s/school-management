require "test_helper"

class Drive::PersonalControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_personal_index_url
    assert_response :success
  end
end
