$(function(){
    //判斷是否登入
    if(getCookie("UID01") != ""){
        //UID01存在，傳遞至後端api判斷是否合法
        var dataJSON = {};
        dataJSON["UID01"] = getCookie("UID01");
        console.log(JSON.stringify(dataJSON));
        $.ajax({
            type: "POST",
            url:"../project/manager_Check_UID_api.php",
            data:JSON.stringify(dataJSON),
            dataType:"json",
            success: showdata_Check_UID,
            error: function(){
                alert("error-../project/manager_Check_UID_api.php")
            }
        });
    }

    //監聽登入按鈕 #modal_login_btn
    $("#modal_login_btn").click(function(){
        console.log($("#login_username").val());
        console.log($("#login_password").val());
        var dataJSON = {};
        dataJSON["UserName"] = $("#login_username").val();
        dataJSON["Password"] = $("#login_password").val();
        console.log(JSON.stringify(dataJSON));

        //傳遞至後端執行登入行為
        $.ajax({
            type:"POST",
            url:"../project/manager_Login_api.php",
            data:JSON.stringify(dataJSON),
            dataType:"json",
            success:showdata_login,
            error:function(){
                alert("error-../project/manager_Login_api.php");
            }
        });
    });

    //監聽登出按鈕 #nav_logout_btn
    $("#nav_logout_btn").click(function(){
        setCookie("UID01", "", 7);
        location.href = "../project/book_manager_index.html";
    });

});

//各種function
function showdata_login(data){
    console.log(data);
    if(data.state){
        alert(data.message);
        console.log(data.data[0].UID01);
        var uid01 = data.data[0].UID01;
        setCookie("UID01", uid01, 7);
        $("#loginModal").modal("hide");
        $("#user_message").text(data.data[0].NickName+"管理者，登入中!");

        //登入後隱藏原本的登入與註冊按鈕
        $("#nav_login_btn").hide();
        $("#nav_reg_btn").hide();

        //登入後開啟會員功能，變成可以使用
        $("#member_info").removeClass("disabled");
        $("#book_info").removeClass("disabled");
        $("#still_thinking").removeClass("disabled");
        // $("#s02_member_btn02").removeClass("disabled");


        //顯示登出按鈕
        $("#nav_logout_btn").removeClass("d-none");

        //登入後才顯示某個區塊
        $("#s03_member_info").removeClass("d-none");

    }else{
        alert(data.message);
    }
}

function showdata_Check_UID(data){
    console.log(data);
    if(data.state){
        //驗證成功
        $("#user_message").text(data.data[0].NickName+"管理者，登入中!");

        //登入後隱藏原本的登入與註冊按鈕
        $("#nav_login_btn").hide();
        $("#nav_reg_btn").hide();

        //登入後開啟會員功能，變成可以使用
        $("#member_info").removeClass("disabled");
        $("#book_info").removeClass("disabled");
        $("#still_thinking").removeClass("disabled");
        // $("#s02_member_btn02").removeClass("disabled");
        
        //顯示登出按鈕
        $("#nav_logout_btn").removeClass("d-none");

        //登入後才顯示某個區塊
        $("#s03_member_info").removeClass("d-none");

    }else{
        //驗證失敗
        //不做任何動作，所以else可以不寫
    }
}        

//登入後取得uid當作cookie
function setCookie(cname, cvalue, exdays){
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}         