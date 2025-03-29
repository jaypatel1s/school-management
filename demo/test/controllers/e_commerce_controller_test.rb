require "test_helper"

class ECommerceControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get e_commerce_index_url
    assert_response :success
  end
end
