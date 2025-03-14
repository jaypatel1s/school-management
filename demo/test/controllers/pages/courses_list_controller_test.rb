require "test_helper"

class Pages::CoursesListControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_courses_list_index_url
    assert_response :success
  end
end
