require "test_helper"

class Pages::AccoridionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_accoridions_index_url
    assert_response :success
  end
end
