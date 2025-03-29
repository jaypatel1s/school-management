require "test_helper"

class Pages::ToastsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_toasts_index_url
    assert_response :success
  end
end
