require "test_helper"

class Pages::ScrollbarControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_scrollbar_index_url
    assert_response :success
  end
end
