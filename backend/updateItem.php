<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");


    include 'database.php';

    $data = json_decode(file_get_contents("php://input"));

    if($data === null){
        echo json_encode([
            'status' => 'failed',
            'message' => 'the data sent in php is null' 
        ]);
    }

    $id = $data->id;
    $prop = $data->{'Prop#'};
    $description = $data->Description;
    $asset = $data->Asset;
    $accountable = $data->Accountable;
    $dateIssued = $data->{'Date Issued'};
    $dateAcquired = $data->{'Date Acquired'};
    $room = $data->{'Room#'};
    $lifeSpan = $data->{'Life Span'};

    $sql = 'UPDATE asset 
    SET `Prop#` = ?, 
    Description = ?, 
    Asset = ?, 
    Accountable = ?, 
    `Date Issued` = ?,
    `Date Acquired` = ?,
    `Room#` = ?,
    `Life Span` = ? 
    WHERE id = ?';

    $sqlUpdate = $conn->prepare($sql);
    $sqlUpdate->bind_param('ssssssssi', $prop, $description, $asset, $accountable, $dateIssued, $dateAcquired, $room, $lifeSpan, $id);
    
    if($sqlUpdate->execute()){
        echo json_encode([
            'status' => 'success',
            'message' => 'Update item Info in Inventory Successful'
        ]);
    }
    else{
        echo json_encode([
            'status' => 'failed',
            'message' => 'Update item Info in Inventory failed'
        ]);
    }
?>