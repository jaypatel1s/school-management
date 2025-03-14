require "test_helper"

class Pages::SelectControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_select_index_url
    assert_response :success
  end
end
