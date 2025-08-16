<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    include 'database.php';
    $data = json_decode(file_get_contents("php://input"));

    foreach ($data as $item) {
        $id = $item->id;
        $roomNum = $item->roomNum;
        $name = $item->name;
        $xPos = $item->xPos;
        $yPos = $item->yPos;
        $pic = $item->pic;
        $ceilingOrFloor = $item->ceilingOrFloor;
        $status = $item->status;
        $itemDeg = $item->itemDeg;

        $idChecker = $conn->prepare('SELECT * FROM room WHERE id = ?');
        $idChecker->bind_param('s', $id);
        $idChecker->execute();

        $result = $idChecker->get_result();

        if (mysqli_num_rows($result) == 0) {      
            $addItemRL = $conn->prepare('INSERT INTO room(id, roomNum, name, yPos, xPos, pic, ceilingOrFloor, status, itemDeg) 
                                        VALUES(?,?,?,?,?,?,?,?,?)');
            $addItemRL->bind_param('sssiisssi', $id, $roomNum, $name, $yPos, $xPos, $pic, $ceilingOrFloor, $status, $itemDeg);
            $addItemRL->execute();
        }
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Adding item Position in Room Layout Successful'
    ]);
?>