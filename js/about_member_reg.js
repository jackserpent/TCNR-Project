$(function () {
    //即時監聽 #reg_username 字數是否符合
    $("#reg_username").bind("input propertychange", function () {
        console.log($(this).val().length);
        if ($(this).val().length > 3 && $(this).val().length < 9) {

            //符合字數規定
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            flag_username = true;

        } else {
            //不符合規定
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
            $("#chk_username").empty();
            $("#chk_username").append("帳號字數不符合規定")
            flag_username = false;
        }
    });

    //檢核帳號是否存在
    $("#reg_username").blur(function () {

        //只有當字數先符合規定之後，才傳送到後端
        if ($(this).val().length > 3 && $(this).val().length < 9) {
            var dataJSON = {};
            dataJSON["UserName"] = $("#reg_username").val();

            $.ajax({
                type: "POST",
                url: "../project/member_Check_uni_api.php",
                data: JSON.stringify(dataJSON),
                dataType: "json",
                success: showdata_check_uni,
                error: function () {
                    alert("error-../project/member_Check_uni_api.php")
                }
            });
        } else {

        }
    });

    //即時監聽 #reg_password
    $("#reg_password").bind("input propertychange", function () {
        console.log($(this).val().length);
        if ($(this).val().length > 4 && $(this).val().length < 11) {
            //符合字數規定
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            flag_password = true;
        } else {
            //不符合規定
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
            flag_password = false;
        }
    });

    //即時監聽 #con_password
    $("#con_password").bind("input propertychange", function () {
        console.log($(this).val().length);
        if ($(this).val() == $("#reg_password").val()) {
            //符合字數規定
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            flag_con_password = true;
        } else {
            //不符合規定
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
            flag_con_password = false;
        }
    });

    //即時監聽 #reg_nickname
    $("#reg_nickname").bind("input propertychange", function () {
        console.log($(this).val().length);
        if ($(this).val() != "" && $(this).val().length > 1) {
            //符合規定
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            flag_nickname = true;
        } else {
            //不符合規定
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
            flag_nickname = false;
        }
    });

    //即時監聽 #reg_email & #reg_domain
    $("#reg_email").bind("input propertychange", function () {
        console.log($(this).val().length);
        if ($(this).val().length > 0) {
            //#reg_email符合規定
            $("#reg_domain").removeClass("disabled");
            $(this).removeClass("is-invalid");
            // $(this).addClass("is-valid");
            //flag_email = true;
        } else {
            //#reg_email不符合規定
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
            $("#reg_domain").addClass("disabled");
            //flag_email = false;
        }
    });

    $("#reg_domain").blur("input propertychange", function () {
        console.log($("#reg_domain").val());
        if ($("#reg_domain").val().length > 0) {
            email = $("#reg_email").val();
            domain = $("#reg_domain").val();
            console.log(email);
            console.log(domain);
            full_email = email + "@" + domain;
            console.log(full_email);
            function validateEmail(full_email) {
                var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
                return re.test(full_email);
            }

            if (!validateEmail(full_email)) {
                $('#emailFeedback').show();
                flag_email = false;
                console.log(flag_email);
            } else {
                $('#emailFeedback').hide();
                flag_email = true;
                console.log(flag_email);
            }
        }
    });


    //註冊時選擇會員等級
    $(document).ready(function () {
        // 檢查初始被選中的選項
        checkSelectedOption();

        // 監聽 radio 按鈕的變化
        $('input[name="rad"]').change(function () {
            console.log($(this).val());
            checkSelectedOption();
        });

        // 檢查選擇的選項並顯示相應的紅字
        function checkSelectedOption() {
            var selectedValue = $('input[name="rad"]:checked').val();
            var feeMessage = '';
            switch (selectedValue) {
                case '100':
                    feeMessage = '基本會員免費';
                    break;
                case '200':
                    feeMessage = '進階會員每月 $199';
                    break;
                case '300':
                    feeMessage = '高級會員每月 $399';
                    break;
                default:
                    feeMessage = '';
            }
            $('#membershipFee').text(feeMessage).toggle(feeMessage !== '');
        }
    });

    //即時監聽同意會員規章　#agreement
    $("#agreement").change(function () {
        if ($(this).is(":checked")) {
            console.log("遵守規定");
            flag_agreement = true;
        } else {
            console.log("不遵守規定");
            flag_agreement = false;
        }
    });

    //監聽 modal_reg_btn
    $("#modal_reg_btn").click(function () {
        console.log("modal_reg_btn is work");
        console.log(flag_username);
        console.log(flag_username_chk_uni);
        console.log(flag_password);
        console.log(flag_con_password);
        console.log(flag_email);
        console.log(flag_nickname);
        console.log(flag_agreement);
        console.log(full_email);
        console.log("reg_flag_end");

        //收集會員等級的資料
        var level;//紀錄會員等級
        $.each($("input[name='rad']:checked"), function () {
            console.log($(this).val());
            level = $(this).val();
        });

        if (flag_username && flag_username_chk_uni && flag_password && flag_con_password && flag_email && flag_nickname && flag_agreement) {
            //{"UserName":"XXX", "Password":"XXX", "NickName":"XXX", "Email":"XXX", "Level":"XXX", "Active":"XXX"}
            var dataJSON = {};
            dataJSON["UserName"] = $("#reg_username").val();
            dataJSON["Password"] = $("#reg_password").val();
            dataJSON["Email"] = full_email;
            dataJSON["NickName"] = $("#reg_nickname").val();
            dataJSON["Active"] = active;
            dataJSON["Level"] = level;
            console.log(JSON.stringify(dataJSON));

            //傳遞至後端執行註冊
            $.ajax({
                type: "POST",
                url: "../project/member_Creat_api.php",
                data: JSON.stringify(dataJSON),
                dataType: "json",
                success: showdata,
                error: function () {
                    alert("error-../project/member_Creat_api.php");
                }
            });
        } else {
            alert("欄位有誤請修正!");
        }
    });
});

//各種function

//註冊
function showdata(data) {
    console.log(data);
    if (data.state) {
        alert(data.message);
        location.href = "../project/book_index.html";
    } else {
        alert(data.message);
    }
}

function showdata_check_uni(data){
    console.log(data);
    console.log(flag_username_chk_uni);
    console.log($("#reg_username").val());
    console.log($("#reg_username").val().length);
    //alert(data.message);
    if(data.state){
        //{"state":true,"message":"帳號不存在，可以使用!"}
        // $("#chk_username").removeClass("is-invalid");
        // $("#chk_username").addClass("is-valid");
        // $("#chk_username").empty();        
        flag_username_chk_uni = true;
    }else{
        //{"state":false,"message":"帳號已存在，不可以使用!"}
        $("#reg_username").removeClass("is-valid");
        $("#reg_username").addClass("is-invalid");
        if(data.message == '帳號已存在，不可以使用!')
        {
            $("#chk_username").empty();
            $("#chk_username").append("帳號已被使用")
        }else if(data.message == '此帳號不得使用!'){
            $("#chk_username").empty();
            $("#chk_username").append("帳號不得使用")
        }else{
            $("#chk_username").empty();
            $("#chk_username").append("請輸入帳號")
        }   
        flag_username_chk_uni = false;
    }
}        
        
