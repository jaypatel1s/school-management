require "test_helper"

class Pages::EventDetailsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_event_details_index_url
    assert_response :success
  end
end
