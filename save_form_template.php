<?php


    // get the raw POST data
    $input = file_get_contents("php://input");
    $doc = json_decode( (string) $input, true);
    

    // connect
    $m = new MongoClient();

    // select a database
    $db = $m->forms;

    // select a collection (analogous to a relational database's table)
    $collection = $db->form_templates;

    // add a record
    $collection->insert($doc);


?>