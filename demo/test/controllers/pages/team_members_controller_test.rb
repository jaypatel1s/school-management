require "test_helper"

class Pages::TeamMembersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_team_members_index_url
    assert_response :success
  end
end
