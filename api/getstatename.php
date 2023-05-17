<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();
if(isset($_POST)){
    $json = file_get_contents('php://input');
    $data = json_decode($json);
$state = $db->get('state_list', '*','ID='.$data->state_code);
$request->meta = [
    "error" => false,
    "message" => 'Successfull',
];
$request->state = $state;

echo json_encode($request);
}
?>