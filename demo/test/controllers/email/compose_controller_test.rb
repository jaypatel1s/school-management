require "test_helper"

class Email::ComposeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get email_compose_index_url
    assert_response :success
  end
end
