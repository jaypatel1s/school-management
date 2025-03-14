require "test_helper"

class Pages::ListControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_list_index_url
    assert_response :success
  end
end
