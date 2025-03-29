require "test_helper"

class Pages::BasicElementsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_basic_elements_index_url
    assert_response :success
  end
end
