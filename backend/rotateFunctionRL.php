<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    include 'database.php';
    $data = json_decode(file_get_contents("php://input"));

    $itemDeg = $data->itemDeg;
    $id = $data->id;

    if ($id !== null) {
        $sql = $conn->prepare('UPDATE room SET itemDeg = ? WHERE id = ?');
        $sql->bind_param('is', $itemDeg, $id);

        if($sql->execute()){
            echo json_encode([
                'status' => 'success',
                'message' => 'Update item Rotation Degree Successful'
            ]);
        }
        else{
            echo json_encode([
                'status' => 'failed',
                'message' => 'Update item Rotation Degree failed'
            ]);
        }   
    }

?>