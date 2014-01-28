<?php
error_reporting(E_ERROR);
require_once ("classes/EcoFile.class.php");

//file->createFromView(json_decode($POST['file']));

//$json = '[{"id":"","name":"Lista de Compras.docx","addDate":"2013-12-13T06:37:17.311Z","projectId":"19","blob":"./files/text.txt"},{"id":"","name":"Presentation_pub_boston.pptx","addDate":"2013-12-13T06:37:17.311Z","projectId":"19","blob":"./files/text.txt"},{"id":"","name":"leite_jose_resume.docx","addDate":"2013-12-13T06:37:17.311Z","projectId":"19","blob":"./files/text.txt"}]';

$json = $_POST['filesArray'];

$obj = json_decode($json, true);

$filesArrayReturn =  [ ];

foreach ($obj as $viewFile){
	$file = new EcoFile();
	$file->createFromView($viewFile);
	$file->addOrEdit();
	$filesArrayReturn[] = $file->convertToView();
}



echo json_encode($filesArrayReturn);
?>