require "test_helper"

class Pages::TicketDetailsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_ticket_details_index_url
    assert_response :success
  end
end
