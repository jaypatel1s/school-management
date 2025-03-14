require "test_helper"

class Pages::CreateProjectControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_create_project_index_url
    assert_response :success
  end
end
