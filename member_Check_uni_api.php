<?php
    //原本判斷帳號唯一性的API
    //input: {"UserName":"XXX"}
    //output:
    //{"state":true,"message":"帳號不存在，可以使用!"}
    // {"state":false,"message":"帳號已存在，不可以使用!"}
    // {"state":false,"message":"傳遞參數格式錯誤!"}
    // {"state":false,"message":"未傳入參數!"}

    $data = file_get_contents("php://input","r");//從外部取得資料
    if($data !="")
    {
        $mydata = array();
        $mydata = json_decode($data, true);
        if(isset($mydata["UserName"]) && $mydata["UserName"] != "" )
        {
            if($mydata["UserName"] != "owner" && $mydata["UserName"] != "admin" && $mydata["UserName"] != "localhost" && $mydata["UserName"] != "習大大" && $mydata["UserName"] != "習維尼" && $mydata["UserName"] != "習維尼愛吃蜂蜜")
            {
                $chk_UserName = $mydata["UserName"];

                $servername = "localhost";
                $username = "owner";
                $password = "123456";
                $dbname = "projectdb";

                $conn = mysqli_connect($servername, $username, $password, $dbname);
                if(!$conn){
                    die("連線失敗".mysqli_connect_error());
                }
                $sql = "SELECT UserName FROM book_member WHERE UserName = '$chk_UserName'";
                $result = mysqli_query($conn, $sql);
                if(mysqli_num_rows($result) ==0 ){
                    //理論上來說，帳號在資料庫只會存在一筆，所以只要確認撈出來的$result筆數是不是等於0即可
                    //帳號不存在，可以使用
                    echo '{"state":true,"message":"帳號不存在，可以使用!"}';
                }else{
                    //帳號存在，不可以使用
                    echo '{"state":false,"message":"帳號已存在，不可以使用!"}';
                }
                mysqli_close($conn);
            }else{
                echo '{"state":false,"message":"此帳號不得使用!"}';
            }
        }else{
            echo '{"state":false,"message":"傳遞參數格式錯誤!"}';
        }
    }else{
        echo '{"state":false,"message":"未傳入參數!"}';
    }
?>