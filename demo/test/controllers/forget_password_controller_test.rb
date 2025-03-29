require "test_helper"

class ForgetPasswordControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get forget_password_index_url
    assert_response :success
  end
end
