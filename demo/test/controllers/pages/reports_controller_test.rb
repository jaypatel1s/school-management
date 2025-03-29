require "test_helper"

class Pages::ReportsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_reports_index_url
    assert_response :success
  end
end
