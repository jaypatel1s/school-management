require "test_helper"

class Pages::TicketsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_tickets_index_url
    assert_response :success
  end
end
