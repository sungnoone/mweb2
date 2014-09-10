/**
 * Created by hl on 2014/8/29.
 */

$(document).ready(function(){

})

var RESTFUL_HOST = "http://192.168.1.229:8088";
var RESTFUL_URL_TEST = "/msrv2/";
var RESTFUL_URL_ORDER_SAVE = "/msrv2/order/order_insert_multi/";
var RESTFUL_URL_BOOK_SAVE = "/msrv2/book/book_insert_multi/";

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
    var json_obj = JSON.stringify({"author":"王菲", "text":"我不願意!!"});
    $.ajax({
        type: "POST",
        url:RESTFUL_HOST+RESTFUL_URL_ORDER_SAVE,
        data: json_obj,
        //contentType: "application/json; charset=utf-8",
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

/*===================================================================*/

//新增產品 -- addbook.html
function btn_book_save(){
    var Book_Barcode = $("#book_barcode").val();
    var Book_Name = $("#book_name").val();
    var Book_Price = $("#book_price").val();
    var Book_Description = $("#book_description").val();

    var Book_Json_Object = JSON.stringify({"Book_Barcode":Book_Barcode,"Book_Name":Book_Name,"Book_Price":Book_Price,"Book_Description":Book_Description});
    $.ajax({
        type: "POST",
        url:RESTFUL_HOST+RESTFUL_URL_BOOK_SAVE,
        data: Book_Json_Object,
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


function btn_book_pic1_upload(){
    /*
    var files = $("#book_pic1").prop("files");
    for(var v1=0; v1<files.length; v1++){
        var reader = new FileReader();
        reader.readAsBinaryString(files[v1]);
        alert(files[v1].name);
    }*/

    $("#book_pic1").fileupload({
        dataType: "text",
        done: function(e, data){
            $.each(data.result.files, function(index, file){
                alert(file.name);
                $("#img").append("<p>"+file.name+"</p>")
            });
        }
    });

}



/*===================================================================*/