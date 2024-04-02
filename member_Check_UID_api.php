<?php
    //input: {"UID01":"XXXXX"}
    // {"state":true,"data":"會員資料","message":"驗證成功，可以登入!"}
    // {"state":false,"message":"驗證失敗，不允許登入!"}
    // {"state":false,"message":"傳遞參數格式錯誤!"}
    // {"state":false,"message":"未傳入參數!"}

    $data = file_get_contents("php://input","r");//從外部取得資料
    if($data != "")
    {
    $mydata = array(); //先產生一個陣列，$mydata
    $mydata = json_decode($data, true); //把$data的json資料透過json_decode變成陣列，放進去$mydata裡面
        if(isset($mydata["UID01"]) && $mydata["UID01"] != "")
        {
            $m_UID01 = $mydata["UID01"];
        
            $servername = "localhost";
            $username = "owner";
            $password = "123456";
            $dbname = "projectdb";

            $conn = mysqli_connect($servername,$username,$password,$dbname);
                if(!$conn){
                    die("連線失敗".mysqli_connect_error()); 
                }
            $sql ="SELECT UserName, Email, NickName, UID01, Level, Active FROM book_member WHERE UID01 = '$m_UID01'";

            $result = mysqli_query($conn, $sql);
            if(mysqli_num_rows($result) == 1){

                $sql = "SELECT Active FROM book_member WHERE UID01 = '$m_UID01'";
                $result = mysqli_query($conn, $sql);
                //將資料庫抓到的資料給變數$row
                $row = mysqli_fetch_assoc($result);
                //先比對是否停權，正常=1，所以只有1可以登入
                if($row["Active"] == 1)
                {
                    //驗證成功
                    $sql ="SELECT ID, UserName, Email, NickName, UID01, Level, Active FROM book_member WHERE UID01 = '$m_UID01'";
                    $result = mysqli_query($conn, $sql);
                    $mydata = array();
                    while($row = mysqli_fetch_assoc($result)){
                        $mydata[] = $row;
                    }
                    echo '{"state":true,"data":'.json_encode($mydata).',"message":"驗證成功，可以登入!"}';
                }else{
                    //Active不等於1，也就是處於停權狀態，登入失敗
                    echo '{"state":false,"message":"你已被停權，請洽管理員!"}';
                }  
            }else{
                //驗證失敗
                echo '{"state":false,"message":"驗證失敗，不允許登入!'.$sql.mysqli_error($conn).'"}';
            }
            mysqli_close($conn);
        }else{
        echo '{"state":false,"message":"傳遞參數格式錯誤!"}';
        }
    }else{
        echo '{"state":false,"message":"未傳入參數!"}';
    }
?>