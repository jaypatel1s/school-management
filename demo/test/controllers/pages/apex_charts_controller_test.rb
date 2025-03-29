require "test_helper"

class Pages::ApexChartsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_apex_charts_index_url
    assert_response :success
  end
end
