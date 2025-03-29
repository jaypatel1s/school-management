require "test_helper"

class LmsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get lms_index_url
    assert_response :success
  end
end
