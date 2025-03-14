require "test_helper"

class Pages::BadgesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_badges_index_url
    assert_response :success
  end
end
