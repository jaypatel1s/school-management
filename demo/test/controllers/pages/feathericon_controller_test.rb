require "test_helper"

class Pages::FeathericonControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_feathericon_index_url
    assert_response :success
  end
end
