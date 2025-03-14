require "test_helper"

class Email::SentMailControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get email_sent_mail_index_url
    assert_response :success
  end
end
