require "test_helper"

class Drive::SpamControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_spam_index_url
    assert_response :success
  end
end
