require "test_helper"

class Drive::AssetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_assets_index_url
    assert_response :success
  end
end
