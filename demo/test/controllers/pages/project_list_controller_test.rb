require "test_helper"

class Pages::ProjectListControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_project_list_index_url
    assert_response :success
  end
end
