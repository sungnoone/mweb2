/**
 * Created by hl on 2014/8/29.
 */

$(document).ready(function(){

});

/*===================================================================*/


/*===================================================================*/

function btn_test(){
    var url = RESTFUL_HOST+RESTFUL_URL_TEST;
    var data = "Sending data";
    $.ajax({
        type: "GET",
        url:url,
        contentType: "text/plain; charset=utf-8",
        dataType: "text",
        success: function(data, status, jqXHR){
            alert(data);
        },
        error: function(jqXHR, status){
            alert("FAIL!");
        }
    });
}

/*===================================================================*/

//新增外單 -- addorder.html
function btn_order_save(){
    var Order_Shipping_Barcode = $("#order_barcode").val();
    var Order_Shipping_Subscriber = $("#order_subscriber").val();
    var Order_Shipping_Address = $("#order_address").val();

    if(Order_Shipping_Barcode == ""){
        alert("請輸入訂單編號！！");
        return;
    }

    var Order_Json_Object = {};
    Order_Json_Object[ORDER_SHIPPING_BARCODE] = Order_Shipping_Barcode;
    Order_Json_Object[ORDER_SHIPPING_SUBSCRIBER] = Order_Shipping_Subscriber;
    Order_Json_Object[ORDER_SHIPPING_ADDRESS] = Order_Shipping_Address;
    var jsonText = JSON.stringify(Order_Json_Object);
    alert(jsonText);
    $.ajax({
        type: "POST",
        url:RESTFUL_HOST+RESTFUL_URL_ORDER_SAVE,
        data: jsonText,
        contentType: "application/json",
        dataType: "text",
        success: function(data, status, jqXHR){
            alert(data);
        },
        error: function(jqXHR, status){
            alert("FAIL!");
        }
    });
}


//新增產品 -- addbook.html
function btn_book_save(){
    var Book_Barcode = $("#book_barcode").val();
    var Book_Name = $("#book_name").val();
    var Book_Price = $("#book_price").val();
    var Book_Description = $("#book_description").val();

    if(Book_Barcode=="" || Book_Name==""){
        alert("請輸入編號及書名！！");
        return;
    }

    var Book_Json_Object = {};
    Book_Json_Object[BOOK_IN_STOCK_FIELD_BARCODE] = Book_Barcode;
    Book_Json_Object[BOOK_IN_STOCK_FIELD_NAME] = Book_Name;
    Book_Json_Object[BOOK_IN_STOCK_FIELD_PRICE] = Book_Price;
    Book_Json_Object[BOOK_IN_STOCK_FIELD_DESCRIPTION] = Book_Description;
    var jsonText = JSON.stringify(Book_Json_Object);
    $.ajax({
        type: "POST",
        url:RESTFUL_HOST+RESTFUL_URL_BOOK_SAVE,
        data: jsonText,
        contentType: "application/json",
        dataType: "text",
        success: function(data, status, jqXHR){
            alert(data);
        },
        error: function(jqXHR, status){
            alert("FAIL!");
        }
    });

}


//訂單加入書籍資料
function add_book_into_order(){
    var bookBarcodeStr = $("#book_barcode").val();
    var orderBarcodeStr = $("#order_barcode").val();
    var Query_Json_Object = {};
    Query_Json_Object[BOOK_IN_STOCK_FIELD_BARCODE] = bookBarcodeStr;
    Query_Json_Object[ORDER_SHIPPING_BARCODE] = orderBarcodeStr;
    var jsonText = JSON.stringify(Query_Json_Object);
    $.ajax({
        type: "POST",
        url:RESTFUL_HOST + RESTFUL_URL_ADD_ORDER_CONTENT,
        data: jsonText,
        contentType: "application/json",
        dataType: "html",
        success: function(data, status, jqXHR){
            //insert to order content
            $("#books_list").empty();
            $("#books_list").append(data);
            //re-generate books list
        },
        error: function(jqXHR, status){
            //alert("FAIL!");
        }
    });
}


//輸入訂單編號有異動
function order_barcode_input_chang(){
    var orderBarcodeStr = $("#order_barcode").val();
    var Query_Json_Object = {};
    Query_Json_Object[ORDER_SHIPPING_BARCODE] = orderBarcodeStr;
    var jsonText = JSON.stringify(Query_Json_Object);
    $.ajax({
        type: "POST",
        url:RESTFUL_HOST + RESTFUL_URL_ORDER_QUERY_BY_BARCODE,
        data: jsonText,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, status, jqXHR){
            var count = 0;
            $("#books_ul").empty();
            for(var key in data){
                count++;
                var item = $.parseJSON(data[key]);
                if(item){
                    for(var key1 in item){
                        if(key1==ORDER_SHIPPING_ADDRESS){
                            $("#order_address").val(item[key1]);
                        }else if(key1==ORDER_SHIPPING_SUBSCRIBER){
                            $("#order_subscriber").val(item[key1]);
                        }else if(key1==ORDER_SHIPPING_CONTENT){
                            var barcode_array = item[key1];
                            for(var v1=0; v1<barcode_array.length; v1++){
                                query_book_by_barcode(barcode_array[v1].toString());
                            }
                        }
                    }
                }
            }
        },
        error: function(jqXHR, status){
            alert("FAIL!");
        }
    });
}


/*=============== common(sub) function ===================*/


function query_book_by_barcode(barcode){
    if(barcode=="" || barcode==undefined){
        //alert("沒有可供查詢的條碼編號！！");
        return;
    }
    alert(barcode);
    $.ajax({
        type: "POST",
        url:RESTFUL_HOST + RESTFUL_URL_BOOK_QUERY_BY_BARCODE,
        data: barcode,
        contentType: "application/text; charset=utf-8",
        dataType: "json",
        success: function(data, status, jqXHR){
            //alert(data.length());
            //var jsonObj = $.parseJSON(data);
            for(var key in data){
                var item = $.parseJSON(data[key]);
                $("#books_ul").append("<li id='li_"+barcode+"'></li>");
                $("#li_"+barcode).append("<h3>"+barcode+"</h3>");
                if(item){
                    for(var key1 in item){
                        if(key1==BOOK_IN_STOCK_FIELD_NAME){
                            $("#li_"+barcode).append("<p>"+item[key1]+"</p>");
                        }
                    }
                }
            }
            $("#books_ul").listview("refresh");
        },
        error: function(jqXHR, status){
            alert("FAIL!");
        }
    });

}


//compareJSONKeyReturnValue() 比對JSON取值
function compareJSONKeyReturnValue(compareString, jsonObject){
    JSONMAPVALUE = "";
    try{
        jQuery.each(jsonObject, function(i, val){
            if(i==compareString){
                JSON_KEY_MAP_VALUE = val;
            }
        });
    }catch (ex){
        return ex.toString();
    }
}