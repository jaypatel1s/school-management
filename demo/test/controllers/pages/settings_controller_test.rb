require "test_helper"

class Pages::SettingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_settings_index_url
    assert_response :success
  end
end
