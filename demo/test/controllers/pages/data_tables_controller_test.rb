require "test_helper"

class Pages::DataTablesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_data_tables_index_url
    assert_response :success
  end
end
