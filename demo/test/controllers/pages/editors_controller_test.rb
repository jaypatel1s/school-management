require "test_helper"

class Pages::EditorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_editors_index_url
    assert_response :success
  end
end
