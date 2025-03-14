require "test_helper"

class Pages::WizardControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_wizard_index_url
    assert_response :success
  end
end
