require "test_helper"

class Pages::EventsListControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_events_list_index_url
    assert_response :success
  end
end
