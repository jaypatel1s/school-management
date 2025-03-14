require "test_helper"

class Pages::ProfileControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_profile_index_url
    assert_response :success
  end
end
