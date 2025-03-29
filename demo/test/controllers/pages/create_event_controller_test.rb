require "test_helper"

class Pages::CreateEventControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_create_event_index_url
    assert_response :success
  end
end
