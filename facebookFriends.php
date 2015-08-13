<?php
if(!array_key_exists("username", $_GET) ||
    !$_GET['username']){
    $response=(array('error' => 'Invalid userId'));
}

$firstNames=array(
	'Will',
	'Adam',
	'James',
	'Laurie',
	'Calvin');

$lastNames=array(
	'Best',
	'Goodwin',
	'Auton',
	'James',
	'Davis');

$facebookIds=array(5,11,13,6,2);

for($i = 0; $i<min(count($firstNames),count($lastNames)); $i++){
	$users[$i]=(object)array(
		'firstName' => $firstNames[$i],
		'lastName' => $lastNames[$i],
		'facebookId' => $facebookIds[$i]);
	}

header('Content-Type: application/json');
echo(json_encode($users));
exit(0);

?>