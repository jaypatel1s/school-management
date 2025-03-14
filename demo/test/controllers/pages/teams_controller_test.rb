require "test_helper"

class Pages::TeamsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_teams_index_url
    assert_response :success
  end
end
