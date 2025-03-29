require "test_helper"

class Pages::ProjectOverviewControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_project_overview_index_url
    assert_response :success
  end
end
