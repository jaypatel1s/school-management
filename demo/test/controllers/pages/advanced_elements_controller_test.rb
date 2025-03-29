require "test_helper"

class Pages::AdvancedElementsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_advanced_elements_index_url
    assert_response :success
  end
end
