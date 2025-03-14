require "test_helper"

class Pages::ValidationControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_validation_index_url
    assert_response :success
  end
end
