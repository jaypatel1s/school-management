require "test_helper"

class SigninSignupControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get signin_signup_index_url
    assert_response :success
  end
end
