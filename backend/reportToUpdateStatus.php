<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    include 'database.php';
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    $status = $data->status;

    $sql = 'UPDATE room 
            SET status = ?
            WHERE id = ?';
    
    $addItemRL = $conn->prepare($sql);
    $addItemRL->bind_param('ss', $status, $id);
    $addItemRL->execute();

?>