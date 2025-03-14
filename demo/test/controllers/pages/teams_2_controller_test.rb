require "test_helper"

class Pages::Teams2ControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_teams_2_index_url
    assert_response :success
  end
end
