require "test_helper"

class Pages::InstructorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_instructors_index_url
    assert_response :success
  end
end
