<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require "../vendor/autoload.php";
$mail = new PHPMailer(true);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $name = $data->name;
    $email = $data->email; 
    $subject = $data->subject;
    $message = $data->message;

    if (!empty($name)) {
        $location_data = array(
            'Name' => $name,
            'Email' => $email,
            'Subject' => $subject,
            'Message' => $message,
            'CreatedAt' => $core->datetime
        );
        $location_id = $db->add('contactus', $location_data);

        if ($location_id > 0) {
            //sending regID, password through Email
            try {
                $mail->SMTPDebug = 0;									
                $mail->isSMTP();											
                $mail->Host	 = 'smtp.gmail.com';					
                $mail->SMTPAuth = true;							
                $mail->Username = 'shiksha@nirmaan.org';				
                $mail->Password = 'tlwejdwhammfjbvt';						
                $mail->SMTPSecure = 'tls';							
                $mail->Port	 = 587;
   
                $mail->setFrom("shiksha@nirmaan.org", 'Learning Portal');		
                $mail->addAddress("shiksha@nirmaan.org");
                // $mail->addAddress('srilatha.kaveti@nirmaan.org', 'Srilatha');
                    
                    $mail->isHTML(true);								
                    $mail->Subject = 'You Have a Query From Learning Portal';
                    $mail->Body = 'You have received a query from learning portal. The details are as below. <br /> Sender Name: '.$name.' <br> Sender Email: '.$email.'   <br>Query:   '.$message;
                    $mail->AltBody = 'You have received a query from learning portal. The details are as below. Sender Name: '.$name.' Sender Email: '.$email.' Query:   '.$message;
                    $mail->send();
            } catch (Exception $e) {
            // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            } 

            $request->meta = [
                "error" => false,
                "message" => 'Message sent successfully. Our team will get back to you in 7 working days.'
            ];
            $request->id = $location_id;

        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Fields are missing'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'Fields are missing'
    ];
}
echo json_encode($request);
?>