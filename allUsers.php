<?php

	$artistNames=array(
		'Bob Dylan',
		'Leonard Cohen',
		'Pink Floyd',
		'Dream Theater',
		'FLUME',
		'Katy Perry',
		'Rihanna',
		'Eminem',
		'Bruno Mars',
		'Linkin Park',
		'Metallica',
		'Purity Ring',
		'50 Cent',
		'First Aid Kit',
		'Dire Straits');

	$userNames=array(
		'Buffy',
		'Angel',
		'Willow',
		'Giles',
		'Xander',
		'Spike',
		'Tara',
		'Joyce',
		'Anya',
		'Oz',
		'Dawn',
		'Riley',
		'Joyce',
		'Cordelia',
		'Harmony');


	for($i = 0; $i<min(count($artistNames),count($userNames)); $i++){
		$users[$i]=(object)array(
			'username' => $userNames[$i],
			'favouriteArtist' => $artistNames[$i],
			'facebookId' => $i);
		}
		$response=$users;


header('Content-Type: application/json');
echo(json_encode($response));
exit(0);

?>