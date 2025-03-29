require "test_helper"

class Pages::PopoverTooltipsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_popover_tooltips_index_url
    assert_response :success
  end
end
