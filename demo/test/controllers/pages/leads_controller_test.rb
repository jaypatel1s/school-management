require "test_helper"

class Pages::LeadsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_leads_index_url
    assert_response :success
  end
end
