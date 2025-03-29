require "test_helper"

class Pages::DragDropControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_drag_drop_index_url
    assert_response :success
  end
end
