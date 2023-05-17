<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header('Content-Type: application/json');
    require('../inc/core.php');
    $core = new Core();
    $db = $core->dbcon;
    // $core->check_cors();
    $request = new \stdClass();
    $questions = array();
    $subjects = array('Technical Skills'=>25, 'Soft Skills'=>13, 'General Knowledge' => 12);
    foreach($subjects as $name=>$count){
        $condition = "subject='$name'";
        $orderby = "RAND()";
        //$orderby = "ID";
        $response = $db->get_all('admission_questions', "ID, question, optioncount, options",$condition, $orderby, $count);
        if($response==''){
            $request->meta = [
                "error" => true,
                "questions" => 'Something Went Wrong! Please Try Again'
            ];
            echo json_encode($request);exit;
        }
        else
            $questions[$name] = $response;
    }    
    $request->meta = [
        "error" => false,
        "questions" => $questions
    ];
    echo json_encode($request);
?>