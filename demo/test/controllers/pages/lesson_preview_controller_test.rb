require "test_helper"

class Pages::LessonPreviewControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_lesson_preview_index_url
    assert_response :success
  end
end
