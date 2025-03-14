require "test_helper"

class Pages::BasicTableControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_basic_table_index_url
    assert_response :success
  end
end
