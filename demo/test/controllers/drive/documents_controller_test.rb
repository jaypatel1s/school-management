require "test_helper"

class Drive::DocumentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get drive_documents_index_url
    assert_response :success
  end
end
