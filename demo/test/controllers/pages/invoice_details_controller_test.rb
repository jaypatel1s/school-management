require "test_helper"

class Pages::InvoiceDetailsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_invoice_details_index_url
    assert_response :success
  end
end
