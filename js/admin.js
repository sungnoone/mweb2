/**
 * Created by hl on 2014/9/11.
 */

$(document).ready(function(){
    //alert("ready!!");
});


function btn_account_create(){
    var User_Name = $("#account_name").val();
    var User_Password = $("#account_password").val();
    var User_Pwdconfirm = $("#account_pwdconfirm").val();
    var User_Email = $("#account_email").val();
    var User_Phone_Mobile = $("#account_phone_mobile").val();

    //必要欄位
    if (User_Name=="" || User_Password=="" || User_Pwdconfirm=="" || User_Email=="" || User_Phone_Mobile==""){
        return null
    }
    //密碼確認
    if (User_Password!=User_Pwdconfirm){
        $("page_account_footer").text("密碼不相符");
        alert("請確認密碼輸入正確");
        return null
    }

    var User_Info = JSON.stringify({
        "User_Name":User_Name,
        "User_Password":User_Password,
        "User_Email":User_Email,
        "User_Phone_Mobile":User_Phone_Mobile});

    $.ajax({
        type: "POST",
        url:RESTFUL_HOST+RESTFUL_URL_USER_ADD,
        data: User_Info,
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