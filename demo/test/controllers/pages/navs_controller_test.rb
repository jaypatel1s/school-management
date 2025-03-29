require "test_helper"

class Pages::NavsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_navs_index_url
    assert_response :success
  end
end
