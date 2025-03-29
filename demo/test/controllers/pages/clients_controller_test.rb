require "test_helper"

class Pages::ClientsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_clients_index_url
    assert_response :success
  end
end
