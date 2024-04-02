$(function(){
    //判斷是否登入
    if(getCookie("UID01") != ""){
        //UID01存在，傳遞至後端api判斷是否合法
        var dataJSON = {};
        dataJSON["UID01"] = getCookie("UID01");
        console.log(JSON.stringify(dataJSON));
        $.ajax({
            type: "POST",
            url:"../project/member_Check_UID_api.php",
            data:JSON.stringify(dataJSON),
            dataType:"json",
            success: showdata_Check_UID,
            error: function(){
                alert("error-../project/member_Check_UID_api.php")
            }
        });
    }else{
        //沒有登入的時候轉去的網址
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
            url:"../project/member_Login_api.php",
            data:JSON.stringify(dataJSON),
            dataType:"json",
            success:showdata_login,
            error:function(){
                alert("error-../project/member_Login_api.php");
            }
        });
    });

    //監聽登出按鈕 #nav_logout_btn
    $("#nav_logout_btn").click(function(){
        setCookie("UID01", "", 7);
        location.href = "../project/book_index.html";
    });         
});

function showdata_login(data){
    console.log(data);
    if(data.state){
        location.href = "../project/book_index_login.html";
        alert(data.message);
        console.log(data.data[0].UID01);
        var uid01 = data.data[0].UID01;
        var userId = data.data[0].ID;
        nickname = data.data[0].NickName;
        for_data_userid_use = data.data[0].ID;
        for_created_by_use = data.data[0].NickName;
        
        setCookie("UID01", uid01, 7);
        $("#loginModal").modal("hide");
        $("#user_message").text(data.data[0].NickName+"登入中!");        

        // 將使用者的 ID 賦值給nav裡面的所有功能按鈕
        $("#s02_member_btn01").attr("data-UserId", userId);
        $("#s02_member_btn02").attr("data-UserId", userId);
        $("#s02_member_btn03").attr("data-UserId", userId);
        $("#s02_member_btn04").attr("data-UserId", userId);
        $("#s02_member_btn05").attr("data-UserId", userId);
        $("#s02_member_btn06").attr("data-UserId", userId);
        $("#s02_member_btn07").attr("data-UserId", userId);
        $("#s02_member_btn08").attr("data-UserId", userId);

        // 將使用者的 NickName 賦值給nav裡面的功能按鈕
        $("#s02_member_btn02").attr("data-NickName", nickname);

        // 將使用者的 ID 賦值給顯示藏書數量
        $("#show_manber_book_num").attr("data-UserId", userId);
        // 將使用者的 ID 賦值給新增藏書按鈕
        $("#add_new_book_btn").attr("data-UserId", userId);
        // 將使用者的 ID 賦值給刪除藏書按鈕
        $("#delete_personal_book_btn").attr("data-UserId", userId);
        // 將使用者的 ID 賦值給查詢個人所有藏書按鈕
        $("#search_person_books_btn").attr("data-UserId", userId);
        
        //登入後隱藏原本的登入與註冊按鈕
        $("#nav_login_btn").hide();
        $("#nav_reg_btn").hide();

        //登入後開啟會員功能，變成可以使用
        $("#s02_member_btn01").removeClass("disabled");
        $("#s02_member_btn02").removeClass("disabled");
        $("#s02_member_btn03").removeClass("disabled");
        $("#s02_member_btn04").removeClass("disabled");
        $("#s02_member_btn05").removeClass("disabled");
        $("#s02_member_btn06").removeClass("disabled");
        $("#s02_member_btn07").removeClass("disabled");
        $("#s02_member_btn08").removeClass("disabled");

        //顯示登出按鈕
        $("#nav_logout_btn").removeClass("d-none");

        //登入後才顯示某個區塊
        $("#s03").removeClass("d-none");
        // $("#add_to_person_th").removeClass("d-none");
        // $("#add_to_person_btn").removeClass("d-none");

    }else{
        alert(data.message);
    }
}

function showdata_Check_UID(data){
    console.log(data);
    if(data.state){
        //驗證成功
        console.log(data.data[0].ID);
        console.log(data.data[0].NickName);
        var userId = data.data[0].ID;
        var nickname = data.data[0].NickName;
        for_data_userid_use = data.data[0].ID;
        for_created_by_use = data.data[0].NickName;
        
        $("#user_message").text(data.data[0].NickName+"登入中!");
        
        // 將使用者的 ID 賦值給nav裡面的所有功能按鈕
        $("#s02_member_btn01").attr("data-UserId", userId);
        $("#s02_member_btn02").attr("data-UserId", userId);
        $("#s02_member_btn03").attr("data-UserId", userId);
        $("#s02_member_btn04").attr("data-UserId", userId);
        $("#s02_member_btn05").attr("data-UserId", userId);
        $("#s02_member_btn06").attr("data-UserId", userId);
        $("#s02_member_btn07").attr("data-UserId", userId);
        $("#s02_member_btn08").attr("data-UserId", userId);
        // 將使用者的 ID 賦值給顯示藏書數量
        $("#show_manber_book_num").attr("data-UserId", userId);
        // 將使用者的 ID 跟 UserName 賦值給新增藏書按鈕
        $("#add_new_book_btn").attr("data-UserId", userId);
        $("#add_new_book_btn").attr("data-NickName", nickname);
        // 將使用者的 ID 賦值給刪除藏書按鈕
        $("#delete_personal_book_btn").attr("data-UserId", userId);
        // 將使用者的 ID 賦值給查詢個人所有藏書按鈕
        $("#search_person_books_btn").attr("data-UserId", userId);
        // 將使用者的 ID 賦值給新增按鈕
        // $("#table_add_to_personal_btn").attr("data-UserId", userId);

        //登入後隱藏原本的登入與註冊按鈕
        $("#nav_login_btn").hide();
        $("#nav_reg_btn").hide();

        //登入後開啟會員功能，變成可以使用
        $("#s02_member_btn01").removeClass("disabled");
        $("#s02_member_btn02").removeClass("disabled");
        $("#s02_member_btn03").removeClass("disabled");
        $("#s02_member_btn04").removeClass("disabled");
        $("#s02_member_btn05").removeClass("disabled");
        $("#s02_member_btn06").removeClass("disabled");
        $("#s02_member_btn07").removeClass("disabled");
        $("#s02_member_btn08").removeClass("disabled");
        
        
        //顯示登出按鈕
        $("#nav_logout_btn").removeClass("d-none");

        //登入後才顯示某個區塊
        $("#s03").removeClass("d-none");
        // $("#add_to_person_th").removeClass("d-none");
        // $("#add_to_person_btn").removeClass("d-none");

        //顯示藏書數量
        var dataJSON = {};
        console.log($("#show_manber_book_num").data("userid"));
        dataJSON["ID"] = $("#show_manber_book_num").data("userid");
        $.ajax({
            type:"POST",
            url:"../project/read_person_book_num.php",
            data:JSON.stringify(dataJSON),
            dataType:"json",
            success:showdata_book_num,
            error:function(){
                alert("error-../project/read_person_book_num.php")
            }
        });
    }else{
        //驗證失敗
        //不做任何動作，所以else可以不寫
    }
}

function showdata_book_num(data){
    if(data.state){
        console.log(data.data[0]);
        console.log(data.data[0].total_books);
        var bookNum = data.data[0].total_books;
        console.log(bookNum);
        $("#show_manber_book_num").val(bookNum);
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

