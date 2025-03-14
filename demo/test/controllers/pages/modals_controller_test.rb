require "test_helper"

class Pages::ModalsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_modals_index_url
    assert_response :success
  end
end
