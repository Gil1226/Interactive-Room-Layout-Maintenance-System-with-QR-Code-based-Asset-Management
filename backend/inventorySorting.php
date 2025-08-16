<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");


    include 'database.php';

    $data = json_decode(file_get_contents("php://input"));

    $year = $data->year;
    $name = $data->name;

    if ($year === "") {
        $sql = $conn->prepare('SELECT * FROM asset WHERE Accountable = ?');
        $sql->bind_param("s", $name);
    }
    elseif($name === ""){
        $sql = $conn->prepare('SELECT * FROM asset WHERE YEAR(`Date Issued`) = ?');
        $sql->bind_param("i", $year);
    }
    else {
        $sql = $conn->prepare('SELECT * FROM asset WHERE YEAR(`Date Issued`) = ? AND Accountable = ?');
        $sql->bind_param("is", $year, $name);
    }
        $sql->execute();
        $result = $sql->get_result();

        $sortedDAta = array();

        while ($row = $result->fetch_assoc()) {
            $sortedDAta[] = $row;
        }
    echo json_encode($sortedDAta);
?>