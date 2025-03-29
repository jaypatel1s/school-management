require "test_helper"

class Pages::RangeSliderControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_range_slider_index_url
    assert_response :success
  end
end
