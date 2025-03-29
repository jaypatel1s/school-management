require "test_helper"

class Pages::StarterControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_starter_index_url
    assert_response :success
  end
end
