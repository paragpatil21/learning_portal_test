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
    $token = $data->token;
    $newpwd = $data->newpwd;
    $condition = "Token='$token'";
    $request = new \stdClass();

    $response = $db->get('recovery_tokens', "ReferenceId", $condition);
    $total = $db->count('recovery_tokens', "ReferenceId", $condition);
    
    if ($total > 0) {        
        $newpwd= hash('sha256', $newpwd);
        $condition2 = "UniqueID='".$response['ReferenceId']."'";
        $update_data = array(
            'password' => $newpwd
        );
        $result = $db->update('login_details', $update_data, $condition2);
        //delete recovery token     
        $delete_token = $db->delete('recovery_tokens', "ReferenceId='".$response['ReferenceId']."' AND ReferenceType='Student'");
        
        $request->meta = [
            "error" => false,
            "message" => 'Password Reset Successful. Please Login With Your New Password.'
        ];
    } else {        
        $request->meta = [
            "error" => true,
            "message" => 'Invalid Request'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'Invalid Request'
    ];
}
echo json_encode($request);
?>