require "test_helper"

class HelpDeskControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get help_desk_index_url
    assert_response :success
  end
end
