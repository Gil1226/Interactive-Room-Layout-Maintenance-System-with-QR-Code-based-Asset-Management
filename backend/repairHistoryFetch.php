<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    include 'database.php';
    
    $data = json_decode(file_get_contents("php://input"));

    $status = $data->status;
    if ($status === "Repaired" || $status === "Pending") {
        $sql = $conn->prepare('SELECT * FROM repairhistory WHERE status = ?');
        $sql->bind_param('s', $status);
        $sql->execute();
        $result = $sql->get_result();

        $historyList = array();

        while($row = $result->fetch_assoc()){
            $historyList[] = $row;
        }
        echo json_encode($historyList);
    }
    else{
        $sql = $conn->prepare('SELECT * FROM repairhistory');
        $sql->execute();
        $result = $sql->get_result();

        $historyList = array();

        while($row = $result->fetch_assoc()){
            $historyList[] = $row;
        }
        echo json_encode($historyList);
    }
?>