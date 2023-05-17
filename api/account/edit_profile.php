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
    //  echo $data;
    // exit;


    $ID = $_POST['user_id'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $middle_name = $_POST['middle_name'];
    $mobile = $_POST['mobile'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $family_members = $_POST['family_members'];
    $gfirst_name = $_POST['gfirst_name'];
    $glast_name = $_POST['glast_name'];
    $gmobile = $_POST['gmobile'];
    $grelation = $_POST['grelation'];
    $occupation = $_POST['occupation'];
    $edqual = $_POST['edqual'];
    $edstatus = $_POST['edstatus'];
    $dob = $_POST['dob'];
    $marital_status = $_POST['marital_status'];
    $religion = $_POST['religion'];
    $caste_category = $_POST['caste_category'];
    $pincode = $_POST['pincode'];
    $yofpass=$_POST['yofpass'];
    $highed_family=$_POST['highed_family'];
    $prof_cwo=$_POST['prof_cwo'];
    $highedqual_family=$_POST['highedqual_family'];
    $annual_income=$_POST['annual_income'];
    $pwd=$_POST['pwd'];
    $disability=$_POST['disability'];
    $bpl=$_POST['bpl'];


    //checking if email ID is already assigned to other user
    $condition1 = "emailID='$email' AND ID!=".$ID;

    $response1 = $db->get('registrations', "*", $condition1);
    $total1 = $db->count('registrations', "regID", $condition1);
    if ($total1 > 0) {       
       // $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Email ID already in use'
        ];
        echo json_encode($request);exit;
    }

    // $country = $db->get('registrations','Country',"ID=$user_id")['Country'];








        $state = $_POST['state'];
        $district = $_POST['district'];
        // $city = $_POST['city'];
        // $area = $_POST['area'];
       
    
        $address = $_POST['address'];
      
    

    // $school = $_POST['school'];
    // $myclass = $_POST['my_class'];
   

    $update_data = array(
        'first_name' => ucwords($first_name),
        'last_name' => ucwords($last_name),
        'middle_name' => ucwords($middle_name),
        'mobile' => $mobile,
        // 'School' => $school,
        // 'Class' => $myclass,
        'gender' => $gender,
        'emailID' => $email,
        

    );



    if(isset($_FILES['file'])){
        $photo_name = $_FILES['file'];
        $photo_upload = $core->upload_file($photo_name, '../uploads/', array('png', 'jpg', 'jpeg'));
        if ($photo_upload['status'] == 'success') {
           $photo = $photo_upload['path'];  
                } else {
                    $photo = '';
                }
                $update_data['photo_file'] = $photo;
            }



    
        $update_data['state'] = $state;
        $update_data['district'] = $district;
        // $update_data['City'] = $city;
        // $update_data['Area'] = $area;
    
        $update_data['address'] = $address;
        $update_data['gfirst_name']=$gfirst_name;
        $update_data['glast_name']=$glast_name;
        $update_data['grelation']=$grelation;
        $update_data['gmobile']=$gmobile;
        $update_data['family_members']=$family_members;
        $update_data['edqual']=$edqual;
        $update_data['edstatus']=$edstatus;
        $update_data['dob']=$dob;
        $update_data['yofpass']=$yofpass;
        $update_data['pincode']=$pincode;
        $update_data['marital_status']=$marital_status;
        $update_data['religion']=$religion;
        $update_data['caste_category']=$caste_category;
        $update_data['highed_family']=$highed_family;
        $update_data['prof_cwo']=$prof_cwo;
        $update_data['highedqual_family']=$highedqual_family;
        $update_data['annual_income']=$annual_income;
        $update_data['pwd']=$pwd;
        $update_data['bpl']=$bpl;
        $update_data['disability']=$disability;

        // echo $update_data;
        
    $condition = "ID='$ID'";
    $update_student = $db->update('registrations', $update_data, $condition);

    $response = $db->get('registrations', "*", $condition);

    if ($update_student === TRUE) {
        $request->meta = [
            "error" => false,
            "message" => 'Profile successfully updated!'
        ];
        $request->data = $response;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Wrong User ID'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);


