<?php
//input:{"ID":"XX", "Active":"XXX"}
// {"state":true,"message":"更新成功!"}
// {"state":false,"message":"更新失敗!"}
// {"state":false,"message":"傳遞參數格式錯誤!"}
// {"state":false,"message":"未傳入參數!"}

$data = file_get_contents("php://input", "r");

if($data !="")
{
    $mydata = array();//先產生一個陣列，$mydata
    $mydata = json_decode($data, true);//把$data的json資料透過json_decode變成陣列，放進去$mydata裡面

    if(isset($mydata["ID"]) && isset($mydata["Active"]) && $mydata["ID"] != "" && $mydata["Active"] != "")
    {
        $m_ID = $mydata["ID"];
        $m_Active = $mydata["Active"];

        $servername = "localhost";
        $username = "owner";
        $password = "123456";
        $dbname = "projectdb";

        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if(!$conn)
        {
            die("連線失敗".mysqli_connect_error());
        }
        $sql_update = "UPDATE book_member SET Active = '$m_Active' WHERE ID = '$m_ID'";
        if(mysqli_query($conn, $sql_update))
        {
            //更新成功
            echo '{"state":true,"message":"更新成功!"}';
        }else{
            //更新失敗
            echo '{"state":false,"message":"更新失敗!'.$sql_update.mysqli_error($conn).'"}';
        }
        mysqli_close($conn);
    }else{
        echo '{"state":false,"message":"傳遞參數格式錯誤!"}';
    }
}else{
    echo '{"state":false,"message":"未傳入參數!"}';
}
?>