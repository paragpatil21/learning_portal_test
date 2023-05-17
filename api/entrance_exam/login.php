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
        
        $username = $_POST['username'];
        $password = $_POST['password'];
        $password = hash("sha256", $password);
    
        
        $condition = "regID='$username'  AND password='$password'";
        
        $response = $db->get('registrations', "ID, status, first_name, last_name, exam_validity",$condition);
        
        $total = $db->count('registrations', "*", $condition);
       // echo $total;
        if ($total > 0) {
            if($response['exam_validity']<date('Y-m-d') && $response['status']=='Registered'){
                //update the staus
                $condition = "regID='$username'";
                $update_data = array(
                    'status' => 'Not Attended Written Test'
                );
                $update_student = $db->update('registrations', $update_data, $condition);
                $response['status'] = 'Not Attended Written Test';
            }
            $response['regID'] = $username;
            $request->meta = [
                "error" => false,
                "message" => 'Successfully Logged In'
            ];
            $request->data = $response;
            echo json_encode($request);
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Wrong Username or Password'
            ];
            echo json_encode($request);
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Please enter the details'
        ];
        echo json_encode($request);
    }
?>