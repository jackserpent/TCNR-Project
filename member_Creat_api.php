<?php
//input：{"UserName":"XXX", "Password":"XXX", "NickName":"XXX", "Email":"XXX", "Level":"XXX", "Active":"XXX"}

$data = file_get_contents("php://input", "r");
if($data != ""){
    $mydata = array();
    $mydata = json_decode($data, true);

    if(isset($mydata["UserName"]) && isset($mydata["Password"]) && isset($mydata["Email"]) && isset($mydata["NickName"]) && $mydata["UserName"] != "" && $mydata["Password"] != "" && $mydata["Email"] != "" && $mydata["NickName"] != ""){
        $m_UserName = $mydata["UserName"];
        //輸入的密碼使用PASSWORD_DEFAULT加密
        $m_Password = password_hash($mydata["Password"],PASSWORD_DEFAULT);
        $m_NickName = $mydata["NickName"];
        $m_Email = $mydata["Email"];
        $m_Level = $mydata["Level"];
        $m_Active = $mydata["Active"];


        $servername = "localhost";
        $username = "owner";
        $password = "123456";
        $dbname = "projectdb";

        $conn = mysqli_connect($servername,$username,$password,$dbname);
        if(!$conn){
            die("連線失敗".mysqli_connect_error()); 
        }
        $sql ="INSERT INTO book_member(UserName, Password, NickName, Email, Level, Active, UID01) VALUES('$m_UserName', '$m_Password', '$m_NickName', '$m_Email', '$m_Level', '$m_Active', '')";
        if(mysqli_query($conn, $sql)){
            //新增成功
            echo '{"state":true,"message":"註冊成功!"}';
        }else{
            //新增失敗
            echo '{"state":false,"message":"註冊失敗!'.$sql.mysqli_error($conn).'"}';
        }
        mysqli_close($conn);
    }else{
        echo '{"state":false,"message":"傳遞參數格式錯誤!"}';
    }
}else{
    echo '{"state":false,"message":"未傳入參數!"}';
}
?>