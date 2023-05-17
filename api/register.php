<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require "../vendor/autoload.php";
$mail = new PHPMailer(true);





if (isset($_POST)) {  
    //checking if email, aadhaar already exists
    $check_email = $db->count('registrations', '*', "emailID='".$_POST["emailID"]."'");
    if ($check_email > 0) {
        $request->meta = [
            "error" => true,
            "message" => 'A user already exists with the given Email ID'
        ];
        echo json_encode($request);
        exit;
    }    
    $check_aadhaar = $db->count('registrations', '*', "aadhaar_number='".$_POST["aadhaar_number"]."'");
    if ($check_aadhaar > 0) {
        $request->meta = [
            "error" => true,
            "message" => 'A user already exists with the given Aadhaar number'
        ];
        echo json_encode($request);
        exit;
    }

    //uploading files

    //photo of the candidate
    $photo='';
    if(isset($_FILES['photo']) && $_FILES['photo']['size'] != 0 )
    {
        $photo_name = $_FILES['photo'];
        $photo_upload = $core->upload_file($photo_name, 'uploads/', array('png', 'jpg', 'jpeg'));
        if ($photo_upload['status'] == 'success') {
            $photo = $photo_upload['path'];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Error in uploading photo. Please check the type of file you have selected and try again.'
            ];
            echo json_encode($request);
            exit;
        }
    }

    //aadhaar card
    $aadhaar_file = '';
    if(isset($_FILES['aadhaar_file']) && $_FILES['aadhaar_file']['size'] != 0 )
    {
        $aadhaar = $_FILES['aadhaar_file'];
        $aadhaar_upload = $core->upload_file($aadhaar, 'uploads/', array('png', 'jpg', 'jpeg','pdf'));
        if ($aadhaar_upload['status'] == 'success') {
            $aadhaar_file = $aadhaar_upload['path'];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Error in uploading aadhaar card. Please check the type of file you have selected and try again.'
            ];
            echo json_encode($request);
            exit;
        }
    }

    //pwd file
    /*$pwd_file='';
    if(isset($_FILES['pwd_file']) && $_FILES['pwd_file']['size'] != 0 )
    {
        $pwd = $_FILES['pwd_file'];
        $pwd_upload = $core->upload_file($pwd, 'uploads/', array('png', 'jpg', 'jpeg','pdf'));
        if ($pwd_upload['status'] == 'success') {
            $pwd_file = $pwd_upload['path'];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Error in uploading disability certificate. Please check the type of file you have selected and try again.'
            ];
            echo json_encode($request);
            exit;
        }
    }*/

    //income card
    $income_file='';
    if(isset($_FILES['income_file']) && $_FILES['income_file']['size'] != 0 )
    {
        $income = $_FILES['income_file'];
        $income_upload = $core->upload_file($income, 'uploads/', array('png', 'jpg', 'jpeg','pdf'));
        if ($income_upload['status'] == 'success') {
            $income_file = $income_upload['path'];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Error in uploading income certificate. Please check the type of file you have selected and try again.'
            ];
            echo json_encode($request);
            exit;
        }
    }
        
    //resume file
    $resume_file='';
    if(isset($_FILES['resume_file']) && $_FILES['resume_file']['size'] != 0 )
    {
        $resume = $_FILES['resume_file'];
        $resume_upload = $core->upload_file($resume, 'uploads/', array('png', 'jpg', 'jpeg','pdf'));
        if ($resume_upload['status'] == 'success') {
            $resume_file = $resume_upload['path'];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Error in uploading resume. Please check the type of file you have selected and try again.'
            ];
            echo json_encode($request);
            exit;
        }
    }

    //ssc certificate
    $ssc_file='';
    if(isset($_FILES['ssc_file']) && $_FILES['ssc_file']['size'] != 0 )
    {
        $ssc = $_FILES['ssc_file'];
        $ssc_upload = $core->upload_file($ssc, 'uploads/', array('png', 'jpg', 'jpeg','pdf'));
        if ($ssc_upload['status'] == 'success') {
            $ssc_file = $ssc_upload['path'];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Error in uploading SSC marks memo. Please check the type of file you have selected and try again.'
            ];
            echo json_encode($request);
            exit;
        }
    }  
    
    //exp file
    $exp_file='';
    if(isset($_FILES['exp_file']) && $_FILES['exp_file']['size'] != 0 )
    {
        $exp = $_FILES['exp_file'];
        $exp_upload = $core->upload_file($exp, 'uploads/', array('png', 'jpg', 'jpeg','pdf'));
        if ($exp_upload['status'] == 'success') {
            $exp_file = $exp_upload['path'];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Error in uploading experience certificate. Please check the type of file you have selected and try again.'
            ];
            echo json_encode($request);
            exit;
        }   
    }

    //othe ID
    $otherID_file = '';
    if(isset($_FILES['otherID_file']) && $_FILES['otherID_file']['size'] != 0 )
    {
        if($_POST['otherID']!=""){   
            $otherID = $_FILES['otherID_file'];
            $otherID_upload = $core->upload_file($otherID, 'uploads/', array('png', 'jpg', 'jpeg','pdf'));
            if ($otherID_upload['status'] == 'success') {
                $otherID_file = $otherID_upload['path'];
            } else {
                $request->meta = [
                    "error" => true,
                    "message" => 'Error in uploading other ID proof. Please check the type of file you have selected and try again.'
                ];
                echo json_encode($request);
                exit;
            }
        }
    }

    //Education Proof
    $edproof_file = '';
    if(isset($_FILES['edproof_file']) && $_FILES['edproof_file']['size'] != 0 )
    {
        $edproof = $_FILES['edproof_file'];
        $edproof_upload = $core->upload_file($edproof, 'uploads/', array('png', 'jpg', 'jpeg','pdf'));
        if ($edproof_upload['status'] == 'success') {
            $edproof_file = $edproof_upload['path'];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Error in uploading education certificate. Please check the type of file you have selected and try again.'
            ];
            echo json_encode($request);
            exit;
        }
    }
    //generating 6 digit random password
    $password = rand(100000,999999);

    //creating regID
    /*$rowcount = $db->count('registration','max(ID)');
    if($rowcount==0){
        $reg_id = 'RWIT' . sprintf('%06d', 1);
    }
    else{
        $current_id = $db->count('registration','max(ID) as id');
        $reg_id = 'RWIT' . sprintf('%06d', $current_id+1);
    }*/

    //inserting data into table
    $student_data = array(
        'first_name' => $_POST['first_name'],
        'last_name' => $_POST['last_name'],
        'middle_name' => $_POST['middle_name'],
        'gender' => $_POST['gender'] ?? "Female",
        'dob' => $_POST['dob'],
        'caste_category' => $_POST['caste_category'] ?? "",
        'religion' => $_POST['religion'] ?? "",
        'marital_status' => $_POST['marital_status'],
        'occupation' => $_POST['occupation'],
        'pwd' => $_POST['pwd'],
        'disability' => isset($_POST['disability'])?$_POST['disability']:"",
        'languages' => $_POST['languages'],
        'photo_file' => $photo,
        'aadhaar_number' => $_POST['aadhaar_number'],
        'aadhaar_file' => $aadhaar_file,
        'otherID' => isset($_POST['otherID'])?$_POST['otherID']:"",
        'otherID_number' => isset($_POST['otherID'])?$_POST['otherID_number']:"",
        'otherID_file' => $otherID_file,
        'mobile' => $_POST['mobile'],
        'emailID' => $_POST['emailID'],
        'address' => $_POST['address'],
        'state' => $_POST['state'],
        'district' => $_POST['district'],
        'pincode' => $_POST['pincode'],
        'edqual' => $_POST['edqual'],
        'edstatus' => $_POST['edstatus'],
        'yofpass' => $_POST['yofpass'] ?? "",
        'edproof_file' => $edproof_file,
        'gfirst_name' => $_POST['gfirst_name'],
        'glast_name' => $_POST['glast_name'],
        'grelation' => $_POST['grelation'],
        'gmobile' => $_POST['gmobile'],
        'family_members' => $_POST['family_members'],
        'annual_income' => $_POST['annual_income'],
        'prof_cwo' => $_POST['prof_cwo'],
        'highed_family' => $_POST['highed_family'],
        'highedqual_family' => $_POST['highedqual_family'],
        'source' => $_POST['source'],
        'tech_level' => $_POST['tech_level'],
        'course' => $_POST['course'],
        'mode' => $_POST['mode'],
        'password' => hash('sha256', $password),
        'enroll_date'=> date('Y-m-d'),
        //'pwd_file' => $pwd_file,
        'income_file' => $income_file,
        'resume_file' => $resume_file,
        'ssc_file' => $ssc_file,
        'exp_file' => $exp_file,
        'specialization'=>$_POST['specialization'] ?? "",
        'mark_percentage'=>$_POST['mark_percentage'] ?? "",
        'pgradtype'=>$_POST['pgradtype'] ?? "",
        'gradtype'=>$_POST['gradtype'] ?? "",
        'center_id'=>$_POST['center'],
        'exam_validity'=>date_format(date_add(date_create(date('Y-m-d')),date_interval_create_from_date_string("14 days")),"Y-m-d")
    );

    $student_insert_id = $db->add('registrations', $student_data);
    if ($student_insert_id > 0) {
        $student_update = $db->update('registrations', array('regID' => 'NWIT' . str_pad($student_insert_id, 6, "0", STR_PAD_LEFT)), "ID=$student_insert_id");
        $condition = "ID='$student_insert_id'";

        //sending regID, password through Email
        $student_unique_id = 'NWIT'.str_pad($student_insert_id, 6, "0", STR_PAD_LEFT);
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
            $mail->addAddress($_POST['emailID']);
           // $mail->addAddress('srilatha.kaveti@nirmaan.org', 'Srilatha');
            
            $mail->isHTML(true);								
            $mail->Subject = 'Nirmaan Learning Portal - After Registration Procedure';
            $mail->Body = 'Hello '.$_POST['first_name'].' '.$_POST['last_name'].'.<br>Thank you for registering with us. To be eligible for this program you need to clear an online written test 2 weeks from now i.e., on or before '.date_format(date_add(date_create(date('Y-m-d')),date_interval_create_from_date_string("14 days")),"d-m-Y").'. The URL for the online test is <a href="https://psychometric-test.nirmaan.org/">https://psychometric-test.nirmaan.org/</a>. Click on the link or copy paste it in a browser to attend the exam. Your login credentials for the exam are as follows. <br><br> Username : NWIT'.str_pad($student_insert_id, 6, "0", STR_PAD_LEFT).'<br>Password : '.$password.'<br><br>If you are facing any issues in the online exam please contact us at shiksha@nirmaan.org or +91-6281450591, +91-8247717684.<br><br>Best Wishes<br>Nirmaan Skill Training Center,<br> Nirmaan Organization,<br> Hyderabad.';
                
            $mail->AltBody = 'Hello '.$_POST['first_name'].' '.$_POST['last_name'].'. Thank you for registering with us. To be eligible for this program you need to clear an online written test 2 weeks from now i.e., on or before '.date_format(date_add(date_create(date('Y-m-d')),date_interval_create_from_date_string("14 days")),"d-m-Y").'. The URL for the online test is https://psychometric-test.nirmaan.org/. Click on the link or copy paste the link in a browser to start writing the exam. Your login credentials for the exam are as follows. Username : '.$student_unique_id.' Password : '.$password.'.If you are facing any issues in the online exam please contact us at shiksha@nirmaan.org or+91-6281450591, +91-8247717684. Best Wishes,Nirmaan Skill Training Center,Nirmaan Organization, Hyderabad.';
             $mail->send();
        } catch (Exception $e) {
           // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
        $source='shiksha.nirmaan.org';
        $lms_code='Nir_LMS';

        $data=array(
        'username'=>$student_unique_id,
        'password'=>$password,
        'first_name'=>$_POST['first_name'],
        'last_name'=>$_POST['last_name'],
        'email'=>$_POST['emailID'],
        'dob'=>$_POST['dob'],
        'source'=>$source,
        'lms_code'=>$lms_code,
        );
        // Build the query string
        $queryString = http_build_query($data);
        // Specify the URL endpoint
        $url = 'https://psychometric-test-staging.nirmaan.org/api/getdata.php?' . $queryString;
        // echo $url;
        
        
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

// Execute the cURL request
$response = curl_exec($curl);
// echo $response . "parag";
if (curl_errno($curl)) {
    $error = curl_error($curl);
    // var_dump($error);
    // Handle the error appropriately
    // ...
}
curl_close($curl);

        // $output_data = array('username' => $student_unique_id,'password' => $password,'first_name'=>$_POST['first_name'],'last_name'=>$_POST['last_name'],'email'=>$_POST['emailID'],'dob'=>$_POST['dob'],'source'=>'shiksha.nirmaan.org', 'lms_code'=>'Nir_LMS');     
        $request->meta = [
            "error" => false,
            'data'=>$response,
            "message" => 'Account successfully created. Please check Your E-mail for further instructions. If you do not get an Email within 24 hours please contact us at shiksha@nirmaan.org or +91-9154172540, +91-6309987152.'
        ];
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Some Error Occured! Please Try again!'
        ];
    }    
    echo json_encode($request); 
    exit;   
} else {
    $request->meta = [
        "error" => true,
        "message" => 'Required data is missing. Please fill the complete form.'
    ];
    echo json_encode($request);
    exit;
}