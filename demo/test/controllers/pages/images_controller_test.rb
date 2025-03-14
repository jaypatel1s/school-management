require "test_helper"

class Pages::ImagesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_images_index_url
    assert_response :success
  end
end
