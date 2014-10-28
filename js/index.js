/** Created by hl on 2014/8/8. **/

var RESTFUL_HOST = "http://192.168.1.229:8088"; //服務主機
var RESTFUL_URL_TEST = "/msrv2/"; //測試用

var RESTFUL_URL_ORDER_SAVE = "/msrv2/order/order_insert/"; //新增空訂單
var RESTFUL_URL_ORDER_QUERY_BY_BARCODE =  "/msrv2/order/order_query_by_barcode/"; //以條碼查詢訂單
var RESTFUL_URL_BOOK_QUERY_BY_BARCODE =  "/msrv2/book/book_query_by_barcode/"; //以條碼查詢書本
var RESTFUL_URL_ADD_ORDER_CONTENT = "/msrv2/book/book_insert_into_order/";//新增(修改)訂單內容

var RESTFUL_URL_BOOK_SAVE = "/msrv2/book/book_insert/"; //新增產品基本檔

var RESTFUL_URL_USER_ADD = "/msrv2/admin/account_create/"; //新增使用者帳號

//BOOK_IN_STOCK fields
var BOOK_IN_STOCK_FIELD_NAME = "book_name";
var BOOK_IN_STOCK_FIELD_BARCODE = "book_barcode";
var BOOK_IN_STOCK_FIELD_PRICE = "book_price";
var BOOK_IN_STOCK_FIELD_DESCRIPTION = "book_description";

//ORDER_SHIPPING fields
var ORDER_SHIPPING_BARCODE = "order_barcode";
var ORDER_SHIPPING_SUBSCRIBER = "order_subscriber";
var ORDER_SHIPPING_ADDRESS = "order_address";
var ORDER_SHIPPING_CONTENT = "order_content";

/*function change_page_admin(){
    $.mobile.pageContainer.pagecontainer("change", "admin.html", {
        transition:"pop",
        reload:true
    })
}*/










