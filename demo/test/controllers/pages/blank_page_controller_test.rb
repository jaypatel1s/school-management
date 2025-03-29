require "test_helper"

class Pages::BlankPageControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_blank_page_index_url
    assert_response :success
  end
end
