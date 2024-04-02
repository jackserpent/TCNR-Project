<?php
//input:{"ID":"XX", "Level":"XXX"}
// {"state":true,"message":"更新成功!"}
// {"state":false,"message":"更新失敗!"}
// {"state":false,"message":"傳遞參數格式錯誤!"}
// {"state":false,"message":"未傳入參數!"}

$data = file_get_contents("php://input", "r");

if($data !="")
{
    $mydata = array();//先產生一個陣列，$mydata
    $mydata = json_decode($data, true);//把$data的json資料透過json_decode變成陣列，放進去$mydata裡面

    if(isset($mydata["ID"]) && isset($mydata["Level"]) && $mydata["ID"] != "" && $mydata["Level"] != "")
    {
        $m_ID = $mydata["ID"];
        $m_Level = $mydata["Level"];

        $servername = "localhost";
        $username = "owner";
        $password = "123456";
        $dbname = "projectdb";

        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if(!$conn)
        {
            die("連線失敗".mysqli_connect_error());
        }

        // 更新 book_member 資料表中的 Level 欄位
        $sql_update = "UPDATE book_member SET Level = '$m_Level' WHERE ID = '$m_ID'";

        if(mysqli_query($conn, $sql_update))
        {
            $sql_check = "SELECT mlu.* FROM member_level_update_date AS mlu JOIN book_member AS bm ON mlu.UserId = bm.ID WHERE bm.ID = '$m_ID'";

            $result = mysqli_query($conn, $sql_check);

            // 檢查member_level_update_date資料表內是否已經存在相對應UserId的紀錄
            if(mysqli_num_rows($result) > 0)
            {
                // 如果已經存在對應UserId的紀錄，則更新的 Update_at 欄位
                $sql_update_time = "UPDATE member_level_update_date SET Update_at = CURRENT_TIMESTAMP WHERE UserId = '$m_ID'";

                if(mysqli_query($conn, $sql_update_time))
                {
                    //更新成功
                    echo '{"state":true,"message":"會員等級與時間更新成功!"}';
                }else{
                    //更新失敗
                    echo '{"state":false,"message":"更新失敗!'.$sql.mysqli_error($conn).'"}';
                }
            }else{
                // 如果不存在對應的UserId的紀錄，則插入一條新的
                $sql_insert = "INSERT INTO member_level_update_date (UserId, Update_at) VALUES ('$m_ID', CURRENT_TIMESTAMP)";

                if(mysqli_query($conn, $sql_insert))
                {
                    //更新成功
                    echo '{"state":true,"message":"會員等級更新成功與updata時間新增成功!"}';
                }else{
                    //更新失敗
                    echo '{"state":false,"message":"更新失敗!'.$sql.mysqli_error($conn).'"}';
                }
            }
            mysqli_close($conn);
        }else{
            //更新失敗
            echo '{"state":false,"message":"更新失敗!'.$sql.mysqli_error($conn).'"}';
        }
    }else{
        echo '{"state":false,"message":"傳遞參數格式錯誤!"}';
    }
}else{
    echo '{"state":false,"message":"未傳入參數!"}';
}
?>