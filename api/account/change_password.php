<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $password = $data->password;
    $new_password = $data->new_password;
    $password = hash("sha256", trim($password));
    $new_password = hash("sha256", trim($new_password));
    $user_id = $data->user_id;
    $condition = "UniqueID='$user_id'";

    $response = $db->get('login_details', "password", $condition);

    if ($response['password'] === $password) {
        $update_password = $db->update('login_details', array('password' => $new_password), $condition);
        if ($update_password === TRUE) {
            $request->meta = [
                "error" => false,
                "message" => 'Password Successfully Updated.'
            ];
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Invalid User Request.'
            ];
        }
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Incorrect Current Password.'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
