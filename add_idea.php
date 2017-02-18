<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

//Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

//Check connection
if ($conn->connect_error)
{
	die("Connection failed: " . $conn-> connect_error);
}

//Get form data
$idea_name = mysql_real_escape_string($conn, $_REQUEST['IdeaName']);
$description = mysql_real_escape_string($conn, $_REQUEST['Description']);

$sql = "INSERT INTO Ideas (IdeaName, Description)
VALUES ('$idea_name', '$description')";

if ($conn->query($sql) === TRUE)
{
    echo "New record created successfully";
} 
else 
{
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>