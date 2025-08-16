<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    include 'database.php';
    
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    $asset = $data->asset;
    $room = $data->room;
    $priority = $data->priority;
    $dateReported = $data->dateReported;
    $description = $data->description;
    $status = $data->status;

    if ($data !== null) {
        $sql = $conn->prepare('INSERT INTO repairHistory(id, asset, room, priority, dateReported, description, status)
                                VALUES ( ?,?,?,?,?,?,?)');
        $sql->bind_param("sssssss", $id, $asset, $room, $priority, $dateReported, $description, $status);
        if($sql->execute()){
            echo json_encode([
                'status' => 'success',
                'message' => 'Adding report in Repair History Successful'
            ]);
        }
        else{
            echo json_encode([
                'status' => 'failed',
                'message' => 'Adding report in Repair History Failed'
            ]);
        }
    }else {
        echo json_encode([
            'status' => 'failed',
            'message' => 'Adding report in Repair History Empty'
        ]);
    }
?>