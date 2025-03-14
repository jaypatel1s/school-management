require "test_helper"

class Email::SpamControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get email_spam_index_url
    assert_response :success
  end
end
