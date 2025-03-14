require "test_helper"

class Pages::CheckRadioControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_check_radio_index_url
    assert_response :success
  end
end
