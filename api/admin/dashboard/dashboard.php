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
    // $json = file_get_contents('php://input');
    // $data = json_decode($json);
    // $user_id = $data->user_id;
    $condition = "isActive='Yes'";
    $conditionactive = "Status='Active' AND isActive='Yes'";
    $conditiondisabled = "Status='Disabled' AND isActive='Yes'";

    $conditionmale = "Gender='Male' AND isActive='Yes'";
    $conditionfemale = "Gender='Female' AND isActive='Yes'";

    $module1completioncondition ="CourseID=1";
    $module2completioncondition ="CourseID=2";
    $module3completioncondition ="CourseID=3";
    $module4completioncondition ="CourseID=4";
    $module5completioncondition ="CourseID=5";

    $result1 ="Percentage>=40 AND Percentage<50";
    $result2 ="Percentage>=50 AND Percentage<60";
    $result3 ="Percentage>=60 AND Percentage<70";
    $result4 ="Percentage>=70 AND Percentage<80";
    $result5 ="Percentage>=80";
    



    $Telangana="State='Telangana'";
    $Karnataka="State='Karnataka'";
    $Tamil_Nadu="State='Tamil Nadu'";
    $Others="State!='Telangana' AND State!='Karnataka' AND State!='Tamil Nadu'";


    $TelanganaM="State='Telangana' AND Gender='Male'";
    $TelanganaF="State='Telangana' AND Gender='Female'";
    $KarnatakaM="State='Karnataka' AND Gender='Male'";
    $KarnatakaF="State='Karnataka' AND Gender='Female'";
    $Tamil_NaduM="State='Tamil Nadu' AND Gender='Male'";
    $Tamil_NaduF="State='Tamil Nadu' AND Gender='Female'";


    $telangana = $db->count('students', "ID", $Telangana);
    $karnataka = $db->count('students', "ID", $Karnataka);
    $tamilnadu = $db->count('students', "ID", $Tamil_Nadu);

    $others = $db->count('students', "ID", $Others);


    $telanganam = $db->count('students', "ID", $TelanganaM);
    $telanganaf  = $db->count('students', "ID", $TelanganaF);
    $karnatakam = $db->count('students', "ID", $KarnatakaM);
    $karnatakaf = $db->count('students', "ID", $KarnatakaF);
    $tamilnadum = $db->count('students', "ID", $Tamil_NaduM);
    $tamilnaduf = $db->count('students', "ID", $Tamil_NaduF);






    // $response = $db->sql("SELECT * FROM `students`");
    $total_students = $db->count('students', "ID", $condition);
    $total_courses = $db->count('courses', "ID", $condition);
    $total_astudents = $db->count('students', "ID", $conditionactive);
    $total_dstudents = $db->count('students', "ID", $conditiondisabled);
    $total_quizzes = $db->count('quiz', "DISTINCT CourseID", $condition);

    $total_male = $db->count('students', "ID", $conditionmale);
    $total_female = $db->count('students', "ID", $conditionfemale);

    $total_certificate = $db->count('certificate', "ID", $condition);



// $module1completion= $db->count('module_quiz_status', "ID", $module1completioncondition);
// $module2completion= $db->count('module_quiz_status', "ID", $module2completioncondition);
// $module3completion= $db->count('module_quiz_status', "ID", $module3completioncondition);
// $module4completion= $db->count('module_quiz_status', "ID", $module4completioncondition);
// $module5completion= $db->count('module_quiz_status', "ID", $module5completioncondition);


// $modulepass1= $db->count('module_quiz_status', "ID", $result1);
// $modulepass2= $db->count('module_quiz_status', "ID", $result2);
// $modulepass3= $db->count('module_quiz_status', "ID", $result3);
// $modulepass4= $db->count('module_quiz_status', "ID", $result4);
// $modulepass5= $db->count('module_quiz_status', "ID", $result5);

    $one_modules = $db->get_all('course_modules', "*", "CourseLevelID=1");
    foreach($one_modules as $key=>$module){
        $one_modules[$key]['Students'] = $db->count('module_quiz_status', "DISTINCT CourseID,StudentID", "CourseID='".$module['ID']."'");
    }

    $request->meta = [
        "error" => false,
        "message" => 'successfull'
    ];


    $request->total_students = $total_students;
    $request->total_courses = $total_courses;
    $request->total_astudents = $total_astudents;
    $request->total_dstudents = $total_dstudents;
    $request->total_quizzes = $total_quizzes;


    $request->total_male = $total_male;
    $request->total_female = $total_female;
    $request->total_certificate = $total_certificate;

    $request->one_modules = $one_modules;


    $request->telangana = $telangana;
    $request->karnataka = $karnataka;
    $request->tamilnadu = $tamilnadu;

    $request->others = $others;


    $request->telanganam = $telanganam;
    $request->telanganaf = $telanganaf;
    $request->karnatakam = $karnatakam;
    $request->karnatakaf = $karnatakaf;
    $request->tamilnadum = $tamilnadum;
    $request->tamilnaduf = $tamilnaduf;







    // $request->module1completion = $module1completion;
    // $request->module2completion = $module2completion;
    // $request->module3completion = $module3completion;
    // $request->module4completion = $module4completion;
    // $request->module5completion = $module5completion;

    // $request->modulepass1 = $modulepass1;
    // $request->modulepass2 = $modulepass2;
    // $request->modulepass3 = $modulepass3;
    // $request->modulepass4 = $modulepass4;
    // $request->modulepass5 = $modulepass5;


} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
