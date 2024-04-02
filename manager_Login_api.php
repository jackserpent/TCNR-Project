<?php
//input:{"UserName":"XXX", "Password":"XXX"}
//output:
// {"state":true,"data":"登入後的帳號資料(密碼除外)","message":"登入成功!"}
// {"state":false,"message":"uid更新錯誤!"}
// {"state":false,"message":"密碼錯誤登入失敗!"}
// {"state":false,"message":"查無帳號登入失敗!"}
// {"state":false,"message":"傳遞參數格式錯誤!"}
// {"state":false,"message":"未傳入參數!"}

$data = file_get_contents("php://input", "r");

if($data !="")
{
    $mydata = array();
    $mydata = json_decode($data, true);
    if(isset($mydata["UserName"]) && isset($mydata["Password"]) && $mydata["UserName"] !="" && $mydata["Password"] !="")
    {
        $m_UserName = $mydata["UserName"];
        $m_Password = $mydata["Password"];

        $servername = "localhost";
        $username = "owner";
        $password = "123456";
        $dbname = "projectdb";

        $conn = mysqli_connect($servername, $username, $password , $dbname);
        if(!$conn)
        {
            die("連線失敗".mysqli_connect_error());
        }

        $sql = "SELECT UserName, Password, Level FROM book_member WHERE UserName = '$m_UserName'";
        $result = mysqli_query($conn, $sql);
         
        if(mysqli_num_rows($result) == 1)
        {
            //確認有帳號符合輸入的值，密碼尚未確認
            //將資料庫抓到的資料給變數$row
            $row = mysqli_fetch_assoc($result);

            //先比對權限，管理員=1，所以只有1可以登入
            if($row["Level"] == 1)
            {
                if(password_verify($m_Password, $row["Password"]))
                {
                    //密碼比對正確，撈取不包含密碼的資料
                    //密碼比對成功之後，就可以產生UID當作cookie
                    $uid = substr(hash("sha256",uniqid(time())),0, 10);

                    //將取得的變數$uid更新進去資料庫
                    $sql = "UPDATE book_member SET UID01 = '$uid' WHERE UserName = '$m_UserName'";

                    if(mysqli_query($conn, $sql))
                    {
                        $sql = "SELECT ID, UserName, NickName, Email, Level, Active, UID01 FROM book_member WHERE UserName = '$m_UserName'";
                        $result = mysqli_query($conn, $sql);
                        $row = mysqli_fetch_assoc($result);
                        $mydata = array();
                        $mydata[] = $row;

                        echo '{"state":true,"data":'.json_encode($mydata).',"message":"登入成功!"}';
                    }
                }else{
                    //密碼比對錯誤
                    echo '{"state":false,"message":"密碼錯誤登入失敗!"}';
                }
            }else{
                //Level不等於1，也就是權限不符合，登入失敗
                echo '{"state":false,"message":"權限不足!"}';
            }
        }else{
            //沒有比對到資料，也就是帳號不符合，登入失敗
            echo '{"state":false,"message":"查無帳號登入失敗!"}';
        }
        mysqli_close($conn);
    }else{
        echo '{"state":false,"message":"傳遞參數格式錯誤!"}';
    }
}else{
    echo '{"state":false,"message":"未傳入參數!"}';
}
?>