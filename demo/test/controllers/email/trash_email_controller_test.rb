require "test_helper"

class Email::TrashEmailControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get email_trash_email_index_url
    assert_response :success
  end
end
