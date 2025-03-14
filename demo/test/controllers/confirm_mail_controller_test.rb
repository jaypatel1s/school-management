require "test_helper"

class ConfirmMailControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get confirm_mail_index_url
    assert_response :success
  end
end
