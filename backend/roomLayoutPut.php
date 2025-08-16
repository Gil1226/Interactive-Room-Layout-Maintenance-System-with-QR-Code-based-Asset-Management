<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    include 'database.php';
    $data = json_decode(file_get_contents("php://input"));

    foreach ($data as $item) {
        $id = $item->id;
        $xPos = $item->xPos;
        $yPos = $item->yPos;

        $positionChecker = $conn->prepare('SELECT * FROM room WHERE xPos = ? AND yPos = ? AND id = ?');
        $positionChecker->bind_param('iis', $xPos, $yPos, $id);
        $positionChecker->execute();
        $result = $positionChecker->get_result();

        if (mysqli_num_rows($result) === 0) {
            $sql = $conn->prepare('UPDATE room 
                                    SET yPos = ?, xPos = ?
                                    WHERE id = ?');
            $sql->bind_param('iis', $yPos, $xPos, $id);
            $sql->execute();
        }
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Updating item Position in Room Layout Successful'
    ]);
?>