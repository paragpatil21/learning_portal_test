<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require "../vendor/autoload.php";
$mail = new PHPMailer(true);

if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $email = $data->email;
    $condition = "emailID='$email' OR regID='$email'";
    $request = new \stdClass();

    $response = $db->get('registrations', "regID, emailID, first_name, last_name", $condition);
    $total = $db->count('registrations', "regID", $condition);
    
    if ($total > 0) {        
        $delete_previous = $db->delete('recovery_tokens', "ReferenceId='".$response['regID']."' AND ReferenceType='Student'");
        $token = hash('sha256', time() . rand(10, 99));

        $recovery_data = array(
            'Token' => $token,
            'ReferenceId' =>$response['regID'],
            'ReferenceType' => 'Student',
            'CreatedAt' => $core->datetime
        );
        $add_key = $db->add('recovery_tokens', $recovery_data);
        
        //send password reset link to the email
        try {
            $mail->SMTPDebug = 0;									
            $mail->isSMTP();											
            $mail->Host	 = 'smtp.gmail.com';					
            $mail->SMTPAuth = true;							
            $mail->Username = 'shiksha@nirmaan.org';				
            $mail->Password = 'tlwejdwhammfjbvt';						
            $mail->SMTPSecure = 'tls';							
            $mail->Port	 = 587;
        
            
            $mail->setFrom('shiksha@nirmaan.org', 'Nirmaan Learning Portal');		
            $mail->addAddress($response['emailID']);
           // $mail->addAddress('srilatha.kaveti@nirmaan.org', 'Srilatha');
            
            $mail->isHTML(true);								
            $mail->Subject = 'Online Learning Portal - Password Reset Link';
            $mail->Body = 'Hello '.$response['first_name'].' '.$response['last_name'].',<br />Click on the below link to reset your password. <br /><a href="https://shiksha.nirmaan.org/recover-password?b='.$token.'">"https://shiksha.nirmaan.org/recover-password?b='.$token.'"</a><br />For any issues, please contact us atshiksha@nirmaan.org or +91-9154172540, +91-6309987152. Best Wishes,Nirmaan Skill Training Center,Nirmaan Organization, Hyderabad. <br /><br />Regards,<br />Future Ready Youth Skilling Center,<br />Nirmaan Organization';
                
            $mail->AltBody = 'Hello '.$response['first_name'].' '.$response['last_name'].',Copy paste the below link in browser to reset your password. "https://shiksha.nirmaan.org/recover-password?b='.$token.'"For any issues, please contact us at shiksha@nirmaan.org or +91-9154172540, +91-6309987152. Best Wishes,Nirmaan Skill Training Center,Nirmaan Organization, Hyderabad. Regards, Nirmaan Organization';  
            $mail->send();
        } catch (Exception $e) {
            $request->meta = [
                "error" => false,
                "message" => 'error'
            ];
            echo json_encode($request); exit;
        }
        $request->meta = [
            "error" => false,
            "message" => 'Instructions to reset password have been sent to your registered Email ID.'
        ];
    } else {        
        $request->meta = [
            "error" => true,
            "message" => 'Please enter valid Email or Registration ID'
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