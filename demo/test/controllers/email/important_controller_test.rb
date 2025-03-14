require "test_helper"

class Email::ImportantControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get email_important_index_url
    assert_response :success
  end
end
