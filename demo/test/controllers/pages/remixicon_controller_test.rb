require "test_helper"

class Pages::RemixiconControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_remixicon_index_url
    assert_response :success
  end
end
