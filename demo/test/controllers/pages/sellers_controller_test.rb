require "test_helper"

class Pages::SellersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_sellers_index_url
    assert_response :success
  end
end
