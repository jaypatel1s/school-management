require "test_helper"

class Pages::CarouselsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_carousels_index_url
    assert_response :success
  end
end
