require "test_helper"

class Email::InboxControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get email_inbox_index_url
    assert_response :success
  end
end
