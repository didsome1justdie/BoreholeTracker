<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$requesttype = $request->request;

include("DBConn.php");

switch($requesttype)
{
	case 'addnewborehole' :
		addnewborehole($request);
		break;
	case 'editboreholedetails':
		editboreholedetails($request);
		break;
	case 'deleteborehole':
		deleteborehole($request);
		break;
	case 'reinstateborehole':
		reinstateborehole($request);
		break;
	case 'addnewreading' :
		addnewreading($request);
		break;
	case 'editreading':
		editreading($request);
		break;
	case 'deletereading':
		deletereading($request);
		break;
	case 'reinstatereading':
		reinstatereading($request);
		break;
	case 'getactiveboreholes':
		getactiveboreholes($request);
		break;
	case 'getinactiveboreholes':
		getinactiveboreholes($request);
		break;
	case 'getreadings':
		getreadings($request);
		break;
	case 'getactivereadings':
		getactivereadings();
		break;
	case 'getinactivereadings':
		getinactivereadings($request);
		break;
		
}

function addnewborehole($req)
{
	include("DBConn.php");

	$name = $req->bornam;
	$type = $req->bortype;
	$lat = $req->lat;
	$long = $req->long;
	$ele = $req->ele;
	
	$insertQuery1 = "insert into Boreholes(BoreholeName, BoreholeType, Latitude, Longitude, Elevation, BoreholeActive) 
									values('$name', '$type', $lat, $long, $ele, 1)";

	$intoDB1 = $con->query($insertQuery1) or die($con->error);
	if($intoDB1)
	{
		$data = 1;
	}
	else
	{
		$data = 0;
	}
	print json_encode($data);
}

function editboreholedetails($req)
{
	include("DBConn.php");

	$borid = $req->borid;
	$name = $req->bornam;
	$type = $req->bortyp;
	$lat = $req->lat;
	$long = $req->long;
	$ele = $req->ele;
	
	$updateQuery1 = "UPDATE boreholes SET BoreholeName = '$name', BoreholeType = '$type', Latitude = $lat, Longitude = $long, Elevation = $ele WHERE BoreholeID = '$borid'";

	$intoDB1 = $con->query($updateQuery1) or die($con->error);
	
	if($intoDB1)
	{
		$data = 1;
	}
	else
	{
		$data = 0;
	}
	print json_encode($data);
}

function deleteborehole($req)
{
	include("DBConn.php");

	$borid = $req->borid;
	$fromDB = $con->query("update Boreholes set BoreholeActive = 0 where BoreholeID = ".$borid) or die($con->error);
		
	if($fromDB)
	{
		$data = 1;
	}
	else
	{
		$data = 0;
	}
	print json_encode($data);
}

function reinstateborehole($req)
{
	include("DBConn.php");

	$bornum = $req->bornum;
	$fromDB = $con->query("update Boreholes set BoreholeActive = 1 where BoreholeID = ".$bornum) or die($con->error);
		
	if($fromDB)
	{
		$data = 1;
	}
	else
	{
		$data = 0;
	}
	print json_encode($data);
}

function addnewreading($req)
{
	include("DBConn.php");

	$id = $req->borid;
	$date = $req->readdate;
	$reading = $req->reading;
		
	$insertQuery1 = "insert into WaterLevels(ReadingDate, WaterReading, BoreholeID, ReadingActive) 
									values('$date', $reading, $id, 1)";

	$intoDB1 = $con->query($insertQuery1) or die($con->error);
	if($intoDB1)
	{
		$data = 1;
	}
	else
	{
		$data = 0;
	}
	print json_encode($data);
}

function editreading($req)
{
	include("DBConn.php");

	$readid = $req->readid;
	$date = $req->readdate;
	$reading = $req->reading;
	
	$updateQuery1 = "UPDATE WaterLevels SET ReadingDate = '$date', WaterReading = $reading WHERE ReadingID = $readid";

	$intoDB1 = $con->query($updateQuery1) or die($con->error);
	
	if($intoDB1)
	{
		$data = 1;
	}
	else
	{
		$data = 0;
	}
	print json_encode($data);
}

function deletereading($req)
{
	include("DBConn.php");

	$readid = $req->readid;
	$fromDB = $con->query("update WaterLevels set ReadingActive = 0 where ReadingID = ".$readid) or die($con->error);
		
	if($fromDB)
	{
		$data = 1;
	}
	else
	{
		$data = 0;
	}
	print json_encode($data);
}

function reinstatereading($req)
{
	include("DBConn.php");

	$readid = $req->readid;
	$fromDB = $con->query("update WaterLevels set ReadingActive = 1 where ReadingID = ".$readid) or die($con->error);
		
	if($fromDB)
	{
		$data = 1;
	}
	else
	{
		$data = 0;
	}
	print json_encode($data);
}

function getactiveboreholes()
{
	include("DBConn.php");

	$fromDB = "select * from Boreholes where BoreholeActive = 1";
	$result = $con->query($fromDB) or die($con->error);
	$data = [];
	while($row = $result -> fetch_assoc())
	{
		$data[] = $row;
	}
	print json_encode($data);
}

function getinactiveboreholes()
{
	include("DBConn.php");
	$fromDB = "select * from Boreholes where BoreholeActive = 0";
		
	$result = $con->query($fromDB) or die($con->error);
	$data = [];
	while($row = $result -> fetch_assoc())
	{
		$data[] = $row;
	}
	print json_encode($data);
}

function getreadings($req)
{
	include("DBConn.php");

	$borid = $req->borid;

	$fromDB = "select * from WaterLevels where BoreholeID = $borid and ReadingActive = 1";
	$result = $con->query($fromDB) or die($con->error);
	$data = [];
	while($row = $result -> fetch_assoc())
	{
		$data[] = $row;
	}
	print json_encode($data);
}

function getactivereadings()
{
	include("DBConn.php");
	$fromDB = "select * from WaterLevels where ReadingActive = 1";
		
	$result = $con->query($fromDB) or die($con->error);
	$data = [];
	while($row = $result -> fetch_assoc())
	{
		$data[] = $row;
	}
	print json_encode($data);
}

function getinactivereadings()
{
	include("DBConn.php");
	$fromDB = "select * from WaterLevels where ReadingActive = 0";
		
	$result = $con->query($fromDB) or die($con->error);
	$data = [];
	while($row = $result -> fetch_assoc())
	{
		$data[] = $row;
	}
	print json_encode($data);
}

?>