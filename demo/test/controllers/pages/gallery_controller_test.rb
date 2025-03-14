require "test_helper"

class Pages::GalleryControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_gallery_index_url
    assert_response :success
  end
end
