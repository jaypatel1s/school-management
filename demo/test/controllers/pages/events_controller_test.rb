require "test_helper"

class Pages::EventsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_events_index_url
    assert_response :success
  end
end
