require "test_helper"

class Pages::AnimationControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_animation_index_url
    assert_response :success
  end
end
