<?php
//input：{"BookName":"XXX", "Author":"XXX", "Translator":"XXX", "Type":"XXX", "Publisher":"XXX", "PublishedDate":"XXX", "Page":"XXX", "BookLength":"XXX", "BookWidth":"XXX", "BookThick":"XXX", "Created_by":"XXX"}

$data = file_get_contents("php://input", "r");

if($data != "")
{
    $mydata = array();
    $mydata = json_decode($data, true);
    if(isset($mydata["BookName"]) && isset($mydata["Author"]) && isset($mydata["Translator"]) && isset($mydata["Type"]) && isset($mydata["Publisher"]) && isset($mydata["PublishedDate"]) && isset($mydata["Page"])  && isset($mydata["BookLength"]) && isset($mydata["BookWidth"]) && isset($mydata["BookThick"]) && isset($mydata["Created_by"]) && $mydata["BookName"] !="" && $mydata["Author"] !="" && $mydata["Translator"] !="" && $mydata["Type"] !="" && $mydata["Publisher"] !="" && $mydata["PublishedDate"] !="" && $mydata["Page"] !="" && $mydata["BookLength"] !="" && $mydata["BookWidth"] !="" && $mydata["BookThick"] !="" && $mydata["Created_by"] !="")
    {
        $b_pic = $mydata["BookPic"];
        $b_name = $mydata["BookName"];
        $b_author = $mydata["Author"];
        $b_translator = $mydata["Translator"];
        $b_type = $mydata["Type"];
        $b_publisher = $mydata["Publisher"];
        $b_pubDate = $mydata["PublishedDate"];
        $b_page = $mydata["Page"];
        $b_length = $mydata["BookLength"];
        $b_width = $mydata["BookWidth"];
        $b_thick = $mydata["BookThick"];
        $b_createdby = $mydata["Created_by"];
        $b_editby = $mydata["Edit_by"];
        $b_editat = $mydata["Edit_at"];

        $servername = "localhost";
        $username = "owner";
        $password = "123456";
        $dbname = "projectdb";

        $conn = mysqli_connect($servername,$username,$password,$dbname);
            if(!$conn){
                die("連線失敗".mysqli_connect_error()); 
            }
        $sql = "INSERT INTO book_info(BookPic, BookName, Author, Translator, Type, Publisher, PublishedDate, Page, BookLength, BookWidth, BookThick, Created_by, Edit_by) VALUES('', '$b_name', '$b_author', '$b_translator', '$b_type', '$b_publisher', '$b_pubDate', '$b_page', '$b_length', '$b_width', '$b_thick', '$b_createdby', '')";
        if(mysqli_query($conn, $sql)){
            //新增成功
            // echo '{"state":true,"message":"新增成功!"}';
            $sql = "SELECT * FROM book_info WHERE BookName = '$b_name' AND Created_by = '$b_createdby'";
            $result = mysqli_query($conn, $sql);
            if(mysqli_num_rows($result) > 0){
                $mydata = array();
                while($row = mysqli_fetch_assoc($result)){
                    $mydata[] = $row;
                }
                echo '{"state":true,"data":'.json_encode($mydata).',"message":"讀取成功!"}';
            }else{
                echo '{"state":false,"message":"讀取失敗!"}';
            }
        }else{
            //新增失敗
            echo '{"state":false,"message":"新增失敗!'.$sql.mysqli_error($conn).'"}';
        }
        mysqli_close($conn);
    }else{
        echo '{"state":false,"message":"傳遞參數格式錯誤!"}';
    }
}else{
    echo '{"state":false,"message":"未傳入參數!"}';
}
?>