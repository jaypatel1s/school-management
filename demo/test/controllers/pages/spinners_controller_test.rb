require "test_helper"

class Pages::SpinnersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_spinners_index_url
    assert_response :success
  end
end
