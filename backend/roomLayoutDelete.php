<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    include 'database.php';
    
    $data = json_decode(file_get_contents("php://input"));

    $yPos = $data->yPos ?? null;
    $xPos = $data->xPos ?? null;
    $room = $data->room ?? null;

    if($yPos !== null AND $yPos !== null){
        $sql = $conn->prepare('DELETE FROM room WHERE yPos = ? AND xPos = ?');
        $sql->bind_param('ii', $yPos, $xPos);

        if($sql->execute()){
            echo json_encode([
                'status' => 'Successful',
                'message' => 'Successful Deleting item In Layout'
            ]);
        }else{
            echo json_encode([
                'status' => 'Failed',
                'message' => 'Failed to Delete item In Layout'
            ]);
        }
    }
    elseif ($room !== null) {
        $sql = $conn->prepare('DELETE FROM room WHERE roomNum = ?');
        $sql->bind_param('s', $room);

        if($sql->execute()){
            echo json_encode([
                'status' => 'Successful',
                'message' => 'Successful Deleting item In Layout'
            ]);
        }else{
            echo json_encode([
                'status' => 'Failed',
                'message' => 'Failed to Delete item In Layout'
            ]);
        }
    }
    else {
        echo json_encode([
            'status' => 'Failed',
            'message' => 'Failed to Delete item In Layout'
        ]);
    }
?>  