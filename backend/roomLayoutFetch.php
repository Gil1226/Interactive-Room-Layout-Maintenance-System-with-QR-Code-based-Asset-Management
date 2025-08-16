<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    include 'database.php';
    $data = json_decode(file_get_contents("php://input"));
    
    $room = $data->roomNum;
    $ceilingOrFloor = $data->ceilingOrFloor;

    $sql = $conn->prepare('SELECT * FROM room WHERE roomNum = ? AND ceilingOrFloor = ?');
    $sql->bind_param('ss', $room, $ceilingOrFloor);
    $sql->execute();
    $result = $sql->get_result();

    $roomAsset = array();
    
    while ($row = $result->fetch_assoc()) {
        $roomAsset[] = $row;
    }

    echo json_encode($roomAsset);
?>
