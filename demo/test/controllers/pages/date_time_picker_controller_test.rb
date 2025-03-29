require "test_helper"

class Pages::DateTimePickerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_date_time_picker_index_url
    assert_response :success
  end
end
