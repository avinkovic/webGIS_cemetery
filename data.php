<?php

include("mb_json_encode.php");
require_once 'login.php';

$conn=pg_connect($conn_string);
if (!$conn) {
   die("Error in connection: " . pg_last_error());
}

$broj_groba = '';
if ( isset($_GET['broj_groba'])){
  	$broj_groba = $_GET['broj_groba'];

	if ( $broj_groba != "" ){

		$upit_ukopani = "SELECT * FROM ukopani WHERE broj_groba='$broj_groba'";
	
		$result_ukopani = pg_query($upit_ukopani);
	
		$nbrows_u = pg_num_rows($result_ukopani);
	
		if($nbrows_u>0){
			while($rec_u = pg_fetch_assoc($result_ukopani)) {
				$arr_u[] = $rec_u;
			}
			$jsonresult_u = mb_json_encode($arr_u);
	
			echo '{"ukopani":{"total_ukopani":'.$nbrows_u.',"results_ukopani":'.$jsonresult_u.'},';
		} else {
			echo '{"total":0, "results":""}';
		}
	
	
 		$upit_korisnici = "SELECT id,ime,prezime,broj_groba,jmbg,adresa,osnova_stjecanja,placanje,iznos_uplate 
 						   FROM korisnici,grobovi_korisnici 
 						   WHERE grobovi_korisnici.id_korisnika=korisnici.id 
 						   AND broj_groba='$broj_groba'";
	
		$result_korisnici = pg_query($upit_korisnici);	
	
		$nbrows_k = pg_num_rows($result_korisnici);
	
		if($nbrows_k>0){
			while($rec_k = pg_fetch_assoc($result_korisnici)) {
				$arr_k[] = $rec_k;
			}
			$jsonresult_k = mb_json_encode($arr_k);
			echo '"korisnici":{"total_korisnici":'.$nbrows_k.',"results_korisnici":'.$jsonresult_k.'}}';
		} else {
				echo '"korisnici":{"total_korisnici":0, "results_korisnici":""}}';
		}	
		
 		// free memory
 		pg_free_result($result_ukopani); 
		// free memory
		pg_free_result($result_korisnici); 
		// close connection
		pg_close($conn);

	}
}



//switch($broj_groba){
//  case "LISTING_UKOPANI": get_ukopani();
//    break;
//  default:
//    echo "{failure:true}";
//    break;
//}

//function get_ukopani (){
//
//  	$conn=pg_connect("host=localhost port=5432 user=postgres password=postgres dbname=postgis");
//  	if (!$conn) {
//  	   die("Error in connection: " . pg_last_error());
//  	}
//
//	$upit_ukopani = "SELECT * FROM ukopani WHERE broj_groba='$id' LIMIT 10";
//	$result_ukopani = pg_query($upit_ukopani);
//
//	$nbrows_u = pg_num_rows($result_ukopani);
//
//	if($nbrows_u>0){
//		while($rec_u = pg_fetch_assoc($result_ukopani)) {
//			$arr_u[] = $rec_u;
//		}
//		$jsonresult_u = mb_json_encode($arr_u);
//
//		echo '{"total_ukopani":'.$nbrows_u.',"results_ukopani":'.$jsonresult_u.'}';
//	} else {
//		echo '{"total":"0", "results":""}';
//	}
//
// 	// free memory
// 	pg_free_result($result_ukopani);  
//	
// 	// close connection
// 	pg_close($conn);
//
//}


//$task_korisnici = '';
//if ( isset($_POST['task_korisnici'])){
//  $task_korisnici
//   = $_POST['task_korisnici'];   // Get this from Ext
//}
//switch($task_korisnici){
//  case "LISTING_KORISNICI":              // Give the entire list
//    get_korisnici();
//    break;
//  default:
//    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
//    break;
//}

//function get_korisnici (){

//	$conn=pg_connect("host=localhost port=5432 user=postgres password=postgres dbname=postgis");
//	if (!$conn) {
//	   die("Error in connection: " . pg_last_error());
//	}

//	$upit_korisnici = "SELECT id,ime,prezime,broj_groba,jmbg,adresa,osnova_stjecanja,placanje,iznos_uplate FROM korisnici,grobovi_korisnici WHERE grobovi_korisnici.id_korisnika=korisnici.id LIMIT 10";
//	$result_korisnici = pg_query($upit_korisnici);	
//
//	$nbrows_k = pg_num_rows($result_korisnici);
//
//	if($nbrows_k>0){
//		while($rec_k = pg_fetch_assoc($result_korisnici)) {
//			$arr_k[] = $rec_k;
//		}
//		$jsonresult_k = mb_json_encode($arr_k);
//
//		echo '{"total_korisnici":'.$nbrows_k.',"results_korisnici":'.$jsonresult_k.'}';
//	} else {
//			echo '{"total":"0", "results":""}';
//	}	
	
//	// free memory
//	pg_free_result($result_korisnici); 
	
//	// close connection
//	pg_close($conn);

//}


 ?>       