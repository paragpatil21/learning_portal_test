
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
    $course_lead = $data->course_lead ?? "";
    $condition = "";
    if (!empty($course_lead)) {
        $condition = "s.course='$course_lead'";
    }
    

    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'registrations',
            'as' => 's',
            "on" => 's.regID=rps.StudentID'
        ),
        
        
      
    );




    $response = $db->join_all('reward_points','rps', "DISTINCT StudentID as 'SID', (SELECT SUM(rp.Points) FROM reward_points as rp WHERE rp.StudentID=SID) as 'TotalPoints' , s.first_name ,s.last_name,s.course",$join_array,$condition,"TotalPoints DESC","50","");
    $total = $db->join_count('reward_points', 'rps', "rps.ID", $join_array,"");
    // $response = $db->sql("SELECT * FROM `students`");
    // $response = $db->get_all('reward_points', "DISTINCT StudentID as 'SID', (SELECT SUM(rp.Points) FROM reward_points as rp WHERE rp.StudentID=SID) as 'TotalPoints'","","TotalPoints DESC","","");
    // $total = $db->count('reward_points', "ID","");

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $response;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Wrong Username or password'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);

