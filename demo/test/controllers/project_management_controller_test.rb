require "test_helper"

class ProjectManagementControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get project_management_index_url
    assert_response :success
  end
end
