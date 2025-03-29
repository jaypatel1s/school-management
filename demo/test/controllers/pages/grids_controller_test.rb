require "test_helper"

class Pages::GridsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_grids_index_url
    assert_response :success
  end
end
