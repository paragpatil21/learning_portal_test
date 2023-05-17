<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header('Content-Type: application/json');
    require('../inc/core.php');
    $core = new Core();
    $db = $core->dbcon;
    $request = new \stdClass();
    if (isset($_POST)) {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $formdata = (array)$data->formData;
        $question_numbers = array_keys($formdata);

        //checking if already inserted    
        $total = $db->count('exam_marks', "*", "regID='".$data->regID."'");
        if($total>0){
            exit;
        }

        //fetching answers
        $condition = "ID in (". implode(",",$question_numbers).")";
        $orderby = "ID";
        $response = $db->get_all('admission_questions', "ID, answer, subject ", $condition, $orderby);
        $marks = array('Technical Skills'=>0, 'General Knowledge'=>0, 'Soft Skills'=>0);
        $total = 0;

        //calculating marks
        foreach($response as $item){
            if($item['answer']===$formdata[$item['ID']]){
                $marks[$item['subject']]+=1;
                
            }
        }
        $insert_array = array(
            'regID' => $data->regID,
            'full_json' => json_encode($formdata),
            'subject_total' => json_encode($marks)
        );
        $insert = $db->add2('exam_marks', $insert_array);
        
        $update_array = array(
            'status' => 'Written Test Completed'
        );
        $update = $db->update('registrations',$update_array,"regID='".$data->regID."'");

        //for updating cookies
        $response2 = $db->get('registrations', "ID, regID, status, exam_validity", "regID='".$data->regID."'");
        $request->meta = [
            "error" => false,
            "message" => 'success'
        ];
        $request->data = $response2;
        echo json_encode($request);
    }
?>