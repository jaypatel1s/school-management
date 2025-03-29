require "test_helper"

class Pages::MyProjectsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_my_projects_index_url
    assert_response :success
  end
end
