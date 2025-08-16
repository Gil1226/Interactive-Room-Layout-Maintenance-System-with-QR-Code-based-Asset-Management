<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

    include 'database.php';

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $data = json_decode(file_get_contents("php://input"));

        $prop = $data->{'Prop#'};
        $description = $data->Description;
        $asset = $data->Asset;
        $accountable = $data->Accountable;
        $dateIssued = $data->{'Date Issued'};
        $dateAcquired = $data->{'Date Acquired'};
        $room = $data->{'Room#'};
        $lifeSpan = $data->{'Life Span'};

        $addItemSQL = $conn->prepare('INSERT INTO asset (`Prop#`, `Description`, Asset, Accountable, `Date Issued`,`Date Acquired`, `Room#`,`Life Span`)
                                    VALUES (?,?,?,?,?,?,?,?)');
        $addItemSQL->bind_param('isssssss', $prop, $description, $asset, $accountable, $dateIssued, $dateAcquired, $room, $lifeSpan);
        

        if($addItemSQL->execute()){
            echo json_encode([
                'status' => 'success',
                'message' => 'Adding item in Inventory Successful'
            ]);
        }
        else{
            echo json_encode([
                'status' => 'failed',
                'message' => 'Adding item in Inventory Failed'
            ]);
        }
    }
?>