require "test_helper"

class Pages::NotificationControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_notification_index_url
    assert_response :success
  end
end
