<?php
//input: {"ID":"XXXXX"}
// {"state":true,"data":"個人書籍資料","message":"讀取成功!"}
// {"state":false,"message":"讀取失敗!"}

$data = file_get_contents("php://input", "r");

if($data != "")
{
    $mydata = array();
    $mydata = json_decode($data, true);
    if(isset($mydata["ID"]) && ($mydata["ID"]) !="" )
    {
        $m_userId = $mydata["ID"];

        $servername = "localhost";
        $username = "owner";
        $password = "123456";
        $dbname = "projectdb";

        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if(!$conn){
            die("連線失敗". mysqli_connect_error());
        }

        $sql = "SELECT COUNT(*) AS total_books
        FROM personal_book_info AS pbi
        JOIN book_info AS bi ON pbi.BookId = bi.ID
        JOIN book_member AS bm ON pbi.UserId = bm.ID
        WHERE bm.ID = '$m_userId'";
        
        $result = mysqli_query($conn, $sql); //$result是我讀取到的所有資料

        if(mysqli_num_rows($result) > 0){
            $mydata = array();
            while($row = mysqli_fetch_assoc($result)){
                $mydata[] = $row;
            }
            echo '{"state":true,"data":'.json_encode($mydata).',"message":"讀取成功!"}';
        }else{
            echo '{"state":false,"message":"查無資料!"}';
        }
        mysqli_close($conn);
    }
}

?>
