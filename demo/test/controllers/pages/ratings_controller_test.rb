require "test_helper"

class Pages::RatingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_ratings_index_url
    assert_response :success
  end
end
