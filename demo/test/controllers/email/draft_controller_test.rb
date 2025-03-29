require "test_helper"

class Email::DraftControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get email_draft_index_url
    assert_response :success
  end
end
