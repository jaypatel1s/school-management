require "test_helper"

class Pages::PaginationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pages_paginations_index_url
    assert_response :success
  end
end
