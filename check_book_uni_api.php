<?php
    //input:{"BookName":"XXX"}
    $data = file_get_contents("php://input","r");

    if($data !="")
    {
        $mydata = array();
        $mydata = json_decode($data, true);

        if(isset($mydata["BookName"]) && $mydata["BookName"] != "")
        {
            $chk_bookname = $mydata["BookName"];

            $servername = "localhost";
            $username = "owner";
            $password = "123456";
            $dbname = "projectdb";
            
            $conn = mysqli_connect($servername, $username, $password, $dbname);
            if(!$conn){
                die("連線失敗".mysqli_connect_error());
            }

            $sql = "SELECT * FROM book_info WHERE BookName LIKE '%$chk_bookname%'";

            $result = mysqli_query($conn, $sql);
            if(mysqli_num_rows($result) == 0 ){
                echo '{"state":true,"message":"類似書籍不存在，可以新增!"}';
            }else{
                echo '{"state":false,"message":"已有類似書籍資料，看您要不要使用!"}';
            }
            mysqli_close($conn);
        }else{
            echo '{"state":false,"message":"傳遞參數格式錯誤!"}';
        }
    }else{
        echo '{"state":false,"message":"未傳入參數!"}';
    }
?>