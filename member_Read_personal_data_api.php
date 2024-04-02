<?php
//input:{"ID":"XX"}
//output:
// {"state":true,"data":"個別會員資料","message":"讀取成功!"}
// {"state":false,"message":"讀取失敗!"}
$data = file_get_contents("php://input","r");

if($data !="")
{
    $mydata = array(); //先產生一個陣列，$mydata
    $mydata = json_decode($data, true); //把$data的json資料透過json_decode變成陣列，放進去$mydata裡面
    
    $servername = "localhost";
    $username = "owner";
    $password = "123456";
    $dbname = "projectdb";

    $m_ID = $mydata["ID"];

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if(!$conn)
    {
        die("連線失敗".mysqli_connect_error());
    }

    $sql = "SELECT * FROM book_member WHERE ID = '$m_ID'";
    $result = mysqli_query($conn, $sql);
    if(mysqli_num_rows($result) > 0)
    {
        $mydata = array();
        while($row = mysqli_fetch_assoc($result)){
            $mydata[] = $row;
        }
        echo '{"state":true,"data":'.json_encode($mydata).',"message":"讀取成功!"}';
    }else{
        echo '{"state":false,"message":"讀取失敗!"}';
    }
    mysqli_close($conn);
}

?>