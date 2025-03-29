require "test_helper"

class Pages::CreateCourseControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_create_course_index_url
    assert_response :success
  end
end
