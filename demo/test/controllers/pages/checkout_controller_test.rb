require "test_helper"

class Pages::CheckoutControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_checkout_index_url
    assert_response :success
  end
end
