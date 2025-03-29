require "test_helper"

class Pages::ReviewsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_reviews_index_url
    assert_response :success
  end
end
