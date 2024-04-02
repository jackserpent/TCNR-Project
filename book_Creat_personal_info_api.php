<?php
//input:{"BookId":"XXX", "UserId":"XXX", "BuyDate":"XXX", "BuyNum":"XXX", "BuyAmount":"XXX", "Readed":"XXX"}

$data = file_get_contents("php://input", "r");

if($data != "")
{
    $mydata = array();
    $mydata = json_decode($data, true);
    if(isset($mydata["UserId"]) && isset($mydata["BookId"]) && isset($mydata["BuyDate"]) && isset($mydata["BuyNum"]) && isset($mydata["BuyAmount"])  && isset($mydata["Readed"]) && $mydata["UserId"] !="" && $mydata["BookId"] !="" && $mydata["BuyDate"] !="" && $mydata["BuyNum"] !="" && $mydata["BuyAmount"] !="" && $mydata["Readed"] !="")
    {
        //pbi = personal_book_info
        $pbi_userid = $mydata["UserId"];
        $pbi_bookid = $mydata["BookId"];
        $pbi_buydate = $mydata["BuyDate"];
        $pbi_buynum = $mydata["BuyNum"];
        $pbi_buyamount = $mydata["BuyAmount"];
        $pbi_readed = $mydata["Readed"];

        $servernme = "localhost";
        $username = "owner";
        $password = "123456";
        $dbname = "projectdb";

        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if(!$conn){
            die("連線失敗".mysqli_connect_error());
        }
        //先判斷要新增的書籍是否已存在個人藏書
        $sql = "SELECT pbi.*, bi.BookName, bm.UserName FROM personal_book_info AS pbi JOIN book_info AS bi ON pbi.BookId = bi.ID JOIN book_member AS bm ON pbi.UserId = bm.ID WHERE pbi.UserId = $pbi_userid AND pbi.BookId = $pbi_bookid";

        $result = mysqli_query($conn, $sql);

        if(mysqli_num_rows($result) == 0){
            //該使用者沒有該筆藏書資料
            $sql = "INSERT INTO personal_book_info (UserId, BookId, BuyDate, BuyNum, BuyAmount, Readed)
            VALUES ($pbi_userid, $pbi_bookid, '$pbi_buydate', $pbi_buynum, $pbi_buyamount, $pbi_readed)";
            if(mysqli_query($conn, $sql)){
                //新增成功
                echo '{"state":true,"message":"新增成功!"}';
            }else{
                //新增失敗
                echo '{"state":false,"message":"新增失敗!'.$sql.mysqli_error($conn).'"}';
            }
            mysqli_close($conn);
        }else{
            //該使用者已經有該筆藏書資料
            echo '{"state":false,"message":"資料已存在!"}';
        }
    }else{
        // echo $data;
        echo '{"state":false,"message":"傳遞參數格式錯誤!"}';
    }
}else{
    echo '{"state":false,"message":"未傳入參數!"}';
}
?>