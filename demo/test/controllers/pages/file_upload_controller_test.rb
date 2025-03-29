require "test_helper"

class Pages::FileUploadControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_file_upload_index_url
    assert_response :success
  end
end
