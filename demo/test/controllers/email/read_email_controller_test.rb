require "test_helper"

class Email::ReadEmailControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get email_read_email_index_url
    assert_response :success
  end
end
