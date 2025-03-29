require "test_helper"

class Pages::EditInvoiceControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_edit_invoice_index_url
    assert_response :success
  end
end
