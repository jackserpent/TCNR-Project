$(function(){

    //讀取會員資料
    $.ajax({
        type:"GET",
        url:"../project/manager_Read_member_All_api.php",
        async:false,
        dataType:"json",
        success: showdata,
        error:function(){
            alert("error-../project/manager_Read_member_All_api.php")
        }
    });

    //監聽更新按鈕 #table_update_btn
    // $("#mydata #table_update_btn").click(function(){
    //原本的click再換頁之後會遇到無法正確抓取資料的狀況，因此改以新的on()的寫法  
    $("body").on("click", "#mydata #table_update_btn", function () {
        //在body底下的"#mydata #table_update_btn"，被"click"之後，執行function()的行為
        console.log($(this).data("id"));
        //抓到隱藏在table_update_btn按鈕裡面的各項數值
        console.log($(this).data("username"));
        console.log($(this).data("email"));
        console.log($(this).data("nickname"));
        //下面這四個remove是當更新的modal被打開後，有欄位的資料更動，但是最後是取消關閉modal的狀態下，這些invalid或是valid在下一次其他的更新被按下時還會存在，所以這邊先remove掉
        $("#updateModal_nickname").removeClass("is-invalid");
        $("#updateModal_nickname").removeClass("is-valid");
        $("#updateModal_email").removeClass("is-invalid");
        $("#updateModal_email").removeClass("is-valid");
        //下面針對email的錯誤訊息也是同理，所以直接hide起來
        $('#emailFeedback').hide();


        u_id = $(this).data("id");
        //將抓到的隱藏數值放到modal裡面的欄位
        $("#updateModal_id").val($(this).data("id"));
        $("#updateModal_username").val($(this).data("username"));
        $("#updateModal_email").val($(this).data("email"));
        $("#updateModal_nickname").val($(this).data("nickname"));
        // $("#updateModal_level").val($(this).data("level"));
        user_level = $(this).data("level");

        //先判斷原先的會員等級
        //收集radio的資料
        console.log(user_level);
        if(user_level == "100"){
            $("#radio01").prop('checked',true);
        }else if(user_level == "200"){
            $("#radio02").prop('checked',true);
        }else if(user_level == "300"){
            $("#radio03").prop('checked',true);
        }else if(user_level == "1"){
            $("#radio04").prop('checked',true);
            $("#radio01").addClass('disabled');
            $("#radio02").addClass('disabled');
            $("#radio03").addClass('disabled');
            $(".addpoint").addClass('disabled');
        }
    });

    //即時監聽更新的會員暱稱 #updateModal_nickname
    $("#updateModal_nickname").bind("input propertychange", function(){
        if($(this).val() !="" && $(this).val().length >1){
            //字數符合規定
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            flag_pname = true;
        }else{
            //字數不符合規定
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
            flag_pname = false;
        }
    });

    //即時監聽更新的會員信箱 #updateModal_email
    $("#updateModal_email").blur(function(){
        console.log($(this).val().length);
        var email= $(this).val();
        console.log(email);
        if(email.length >0 && email !="")
        {
            function validateEmail(email) {
                var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
            
                return re.test(email);
            }
            if (!validateEmail(email)) {
                $('#emailFeedback').show();
            } else {
                $('#emailFeedback').hide();
            }
        
            //符合字數規定
            $("#updateModal_email").removeClass("is-invalid");
            // $(this).addClass("is-valid");
            flag_email = true;
        }else{
            //不符合規定
            $("#updateModal_email").removeClass("is-valid");
            $('#emailFeedback').hide();
            $("#updateModal_email").addClass("is-invalid");
            flag_email = false;
        }
    });

    //即時監聽會員等級變更 #updateModal_level
    $("input[name='rad']").change(function(){
        console.log($(this).val());
        user_level = $(this).val();
        console.log(user_level);
    });
    
    //監聽會員更新的modal的確認按鈕 #updateModal_ok_btn
    $("#updateModal_ok_btn").click(function () {
        //傳遞更新資料給後端api，{"ID":"XX","Email":"XXX","Name":"X"}
        var dataJSON = {};
        dataJSON["ID"] = u_id;
        dataJSON["Email"] = $("#updateModal_email").val();
        dataJSON["NickName"] = $("#updateModal_nickname").val();
        dataJSON["Level"] = user_level;
        console.log(JSON.stringify(dataJSON));

        $.ajax({
        type: "POST",
        url: "../project/member_Update_personal_data_api.php",
        data: JSON.stringify(dataJSON),
        dataType: "json",
        success: showdata_update,
        error: function () {
            alert("error-../project/member_Update_personal_data_api.php");
        }
        });
    });

    //監聽停權按鈕 #table_suspenActive_btn
    //抓到隱藏在按鈕裡面的各項數值
    $("body").on("click", "#mydata #table_suspenActive_btn", function () {
        console.log($(this).data("id"));
        console.log($(this).data("username"));
        console.log($(this).data("active"));

        u_id = $(this).data("id");
        $("#suspenActiveModal_id").val($(this).data("id"));
        $("#suspenActiveModal_username").val($(this).data("username"));
        $("#suspenActiveModal_switch").val($(this).data("active"));
        actived = $("#suspenActiveModal_switch").val();
        console.log(actived);
        if(actived == "1"){
            $("#suspenActiveModal_switch").prop('checked',true);
            $("#suspenActiveModal_switch").next().html("<h4 class='text-primary'>正常</h4>");
        }else{
            $("#suspenActiveModal_switch").prop('checked',false);
            $("#suspenActiveModal_switch").next().html("<h4 class='text-danger'>停權中</h4>");
        }
    });

    //監聽是否停權 #suspenActiveModal_switch
    $("#suspenActiveModal_switch").change(function(){
        console.log($(this).is(':checked'));
        if($(this).is(':checked')){
            $("#suspenActiveModal_switch").next().html("<h4 class='text-primary'>正常</h4>");
            actived = "1";
        }else{
            $("#suspenActiveModal_switch").next().html("<h4 class='text-danger'>停權中</h4>");
            actived = "0";
        }
    });

    //監聽會員停權管理的model的確認按鈕 #suspenActiveModal_ok_btn
    $("#suspenActiveModal_ok_btn").click(function(){
        var dataJSON = {};
        dataJSON["ID"] = u_id;
        dataJSON["Active"] = actived;
        console.log(JSON.stringify(dataJSON));

        $.ajax({
            type:"POST",
            url:"../project/manager_Suspen_api.php",
            data: JSON.stringify(dataJSON),
            dataType:"json",

            success: showdata_suspenActive,
            error: function(){
                alert("error-../project/manager_Suspen_api.php");
            }
        });
    });
});

//各種function

//秀出表單
function showdata(data){
    //整理資料儲存為二維陣列
    //將newData = []，重新設定成全域變數
    console.log(data);//所有的資料
    //forEach會去走訪data.data裡面的每一筆資料，並把key取出來
    data.data.forEach(function(item,key){
        console.log(key);
        if(key % 5 == 0){
            //把key跟3取餘數，當餘數是零的時候，產生一個空的陣列
            newData.push([]);
        }
        //把key除以5，並且無條件捨去，讓他變成變數page
        var page = parseInt(key / 5);
        //把item塞進去新的陣列裡面
        newData[page].push(item);
    });

    //先產生頁碼
    $("#pageList").empty();
    newData.forEach(function (item, key)
    {
        var thisPage = key + 1;
        var strHTML = '<li class="page-item"><a id="page_now_'+ key +'" class="page-link" href="#" onclick="drawTable(' + key + ')">' + thisPage + '</a></li>';
        $("#pageList").append(strHTML);
    });

    drawTable(0);//再執行drawTable這個function，一開始顯示第0陣列，也就是底下function drawTable(page)裡面的page這個變數
    // console.log(newData);
    // console.log(newData[2]);
}

//畫出table
function drawTable(page)
{
    //console.log(page);
    $("#mydata").empty();
    // console.log(item.Level);
    newData[page].forEach(function(item){
        // console.log(item.Level);
        var cht_Level;
        if(item.Level == "1")
        {
            cht_Level = "管理員";
        }else if(item.Level == "100"){
            cht_Level = "基本會員";
        }else if(item.Level == "200"){
            cht_Level = "進階會員";
        }else if(item.Level == "300"){
            cht_Level = "高級會員";
        }
        var cht_suspension;
        var suspen_active_btn;
        var suspen_active_btn_color;
        if(item.Active == "1")
        {
            cht_suspension = "正常";
            suspen_active_btn = "停權";
            btn_color_class = "btn-danger";
        }else{
            cht_suspension = '<p class="suspen_text">停權中</p>';
            suspen_active_btn = "啟用";
            btn_color_class = "btn-primary";
        }
        var strHTML = '<tr><td>' + item.ID + '</td><td>' + item.UserName + '</td><td>' + item.NickName + '</td><td>' + item.Email + '</td><td>' + cht_Level + '</td><td>' + cht_suspension + '</td><td>' + item.Created_at + '</td><td class="text-center"><button id="table_update_btn" class="btn btn-success me-1" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.ID + '" data-username="' + item.UserName + '" data-email="' + item.Email + '" data-nickname="' + item.NickName + '" data-level="' + item.Level + '">更新</button></td><td class="text-center"><button class="btn ' + btn_color_class + '" data-bs-toggle="modal" data-bs-target="#suspenActiveModal" id="table_suspenActive_btn" data-id="' + item.ID + '" data-username="' + item.UserName + '" data-active="' + item.Active + '">' + suspen_active_btn + '</button></td></tr>';

        $("#mydata").append(strHTML);

    });
        $(".page-link").removeClass('active');
        var page_now = "#page_now_"+ page;
        // console.log(page_now);
        $(page_now).addClass('active');
}

//更新資料
function showdata_update(data){
    console.log(data);
    if(data.state){
        alert(data.message);
        location.href="../project/book_manager_check_member_info.html";
    }else{
        alert(data.message);
    }
}

//停權
function showdata_suspenActive(data){
    console.log(data);
    if(data.state){
        alert(data.message);
        location.href="../project/book_manager_check_member_info.html";
    }else{
        alert(data.message);
    }
}