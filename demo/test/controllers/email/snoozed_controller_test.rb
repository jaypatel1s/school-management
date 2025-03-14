require "test_helper"

class Email::SnoozedControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get email_snoozed_index_url
    assert_response :success
  end
end
