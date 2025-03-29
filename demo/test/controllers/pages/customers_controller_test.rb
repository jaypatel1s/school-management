require "test_helper"

class Pages::CustomersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_customers_index_url
    assert_response :success
  end
end
