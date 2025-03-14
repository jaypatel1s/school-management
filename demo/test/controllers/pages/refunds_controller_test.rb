require "test_helper"

class Pages::RefundsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_refunds_index_url
    assert_response :success
  end
end
