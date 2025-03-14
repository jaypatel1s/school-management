require "test_helper"

class Pages::CourseDetailsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_course_details_index_url
    assert_response :success
  end
end
