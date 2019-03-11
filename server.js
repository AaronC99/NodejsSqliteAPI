const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('coe-employees.db');
var express = require('express');
var app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);


//Home Page
app.get('/', function(req, res){
  res.send('This is Aaron\'s API');
});

//Attendance Data
app.get('/api/attendance',(req,res)=>{
	const att = `SELECT attendance.*, employee.empName FROM attendance
INNER JOIN employee ON 
attendance.employeeID = employee.employee_uid
`;

	db.all(att,[],(err,rows)=>{
		if(err){
	  	throw err;
		}

		res.status(200);
		res.send(rows);
	});
});

//Attendance Data
app.get('/api/attendance/clockIn',(req,res)=>{
	const cinTime = `SELECT attendance.employeeID,clockIn FROM attendance
INNER JOIN employee ON 
attendance.employeeID = employee.employee_uid
`;

	db.all(cinTime,[],(err,rows)=>{
		if(err){
	  	throw err;
		}

		res.status(200);
		res.send(rows);
	});
});

//Employee Data
app.get('/api/employees',(req,res)=>{
	const emp = `SELECT * FROM employee`;
	db.all(emp,[],(err,rows)=>{
		if (err){
		throw err;
		}
		res.status(200);
		res.send(rows);
	});
	


});

//PORT 
const port = process.env.PORT || 3003;
app.listen(port,()=> console.log('Listening on Port '+port+'...'));
