require "test_helper"

class Pages::EditCourseControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_edit_course_index_url
    assert_response :success
  end
end
