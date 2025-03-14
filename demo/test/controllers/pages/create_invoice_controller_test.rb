require "test_helper"

class Pages::CreateInvoiceControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_create_invoice_index_url
    assert_response :success
  end
end
