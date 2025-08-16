<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

    include 'database.php';
    if($_SERVER["REQUEST_METHOD"] === 'POST'){
        $data = json_decode(file_get_contents("php://input"));

        $name = filter_var($data->name, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $password = $data->password;

        $sql = $conn->prepare("SELECT * FROM account WHERE username = ?");
        $sql->bind_param('s', $name);
        $sql->execute();
        
        $result = $sql->get_result();

        if(mysqli_num_rows($result) === 1 ){
            $row = mysqli_fetch_assoc($result);
            $savedPass = $row['password'];
            if(password_verify($password, $savedPass)){
                echo json_encode ([
                    "status" => "success",
                    "username" => $name,
                    "message" => 'Succcessful account in php'
                ]);

                
            }
            else{
                echo json_encode([
                    'status' => 'failed',
                    'message' => 'failed account php'
                ]);
            }
        }
    }else{
        echo json_encode(["status" => "failed",
                    "message" => "error account php"]);
}

?>
