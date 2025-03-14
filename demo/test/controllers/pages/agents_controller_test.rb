require "test_helper"

class Pages::AgentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_agents_index_url
    assert_response :success
  end
end
