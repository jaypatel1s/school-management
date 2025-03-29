require "test_helper"

class Pages::TypographyControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_typography_index_url
    assert_response :success
  end
end
