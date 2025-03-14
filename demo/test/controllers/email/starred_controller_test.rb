require "test_helper"

class Email::StarredControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get email_starred_index_url
    assert_response :success
  end
end
