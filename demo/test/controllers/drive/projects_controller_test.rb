require "test_helper"

class Drive::ProjectsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_projects_index_url
    assert_response :success
  end
end
