require "test_helper"

class Pages::CardsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_cards_index_url
    assert_response :success
  end
end
