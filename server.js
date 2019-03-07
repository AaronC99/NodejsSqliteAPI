const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('coe-employees.db');
var express = require('express');
var app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());


app.get('/', function(req, res){
  res.send('This is Aaron\'s API');
});

app.get('/api/attendance',(req,res)=>{
	const att = `SELECT * FROM attendance`;

	db.all(att,[],(err,rows)=>{
		if(err){
	  	throw err;
		}

		res.status(200);
		res.send({
			attendance: rows
		});
	});
});

app.get('/api/employees',(req,res)=>{
	const emp = `SELECT * FROM employee`;
	db.all(emp,[],(err,rows)=>{
		if (err){
		throw err;
		}
		res.status(200);
		res.send({
			employees: rows
		});
	});
	


});


const port = process.env.PORT || 3003;
app.listen(port,()=> console.log('Listening on Port ${port}...'));

 


