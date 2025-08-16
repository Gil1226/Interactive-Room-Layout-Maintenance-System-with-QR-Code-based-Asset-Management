<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'database.php';
    
    $data = json_decode(file_get_contents("php://input"));
    
    $id = $data->id;

    if($id !== null){
        $sqlDelete = $conn->prepare("DELETE FROM asset WHERE id = ?");
        $sqlDelete->bind_param('i', $id);
        $sqlDelete->execute();

        if($sqlDelete->affected_rows > 0){
            echo json_encode([
                'status' => 'success',
                'message' => 'deleted successfully'
            ]);
        }
        else{
            echo json_encode([
                'status' => 'Unsuccessful',
                'message' => 'Failed to Delete in Inventory in php'
            ]);
        }
    }else{
        echo json_encode([
                'status' => 'Unsuccessful',
                'message' => 'Id is missing in Inventory in php'
            ]);
    }
?>