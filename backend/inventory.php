<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'database.php';
    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $asset = "SELECT * FROM asset";
        $assetSql = mysqli_query($conn, $asset);
        
        if(!$assetSql){
            echo json_encode(mysqli_error($conn));
        }
        
        $assetData = array();
        while($row = mysqli_fetch_assoc($assetSql)){
            $assetData[] = $row; 
        }
        echo json_encode($assetData);
    }
    else{
        echo json_encode(["status" => "failed",
                    "message" => "error in Inventory in php"]);
    }
    
?>