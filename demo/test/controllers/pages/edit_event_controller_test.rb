require "test_helper"

class Pages::EditEventControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_edit_event_index_url
    assert_response :success
  end
end
