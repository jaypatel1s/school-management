require "test_helper"

class Pages::ProgessControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_progess_index_url
    assert_response :success
  end
end
