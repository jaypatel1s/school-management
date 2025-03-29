require "test_helper"

class Pages::InvoiceListControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_invoice_list_index_url
    assert_response :success
  end
end
