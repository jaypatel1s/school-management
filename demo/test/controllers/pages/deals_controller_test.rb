require "test_helper"

class Pages::DealsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_deals_index_url
    assert_response :success
  end
end
