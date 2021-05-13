var express = require('express');
var fs=require('fs');
var path=require('path')
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'))

app.get('/', function (req, res) {
res.sendFile( __dirname + "/" + "project.html" );})

app.get('/login1.html', function (req, res) {
res.sendFile( __dirname + "/" + "login1.html" );})


app.get('/project.html', function (req, res) {
res.sendFile( __dirname + "/" + "project.html" );})

app.get('/success.html',function(req,res){
	res.sendFile( __dirname + "/" + "success.html" );
	
})

app.get('/contactsuccess.html',function(req,res){
	res.sendFile( __dirname + "/" + "contactsuccess.html" );
	
})

app.get('/CONTACT2.html',function(req,res){
	res.sendFile( __dirname + "/" + "CONTACT2.html" );
	
})


app.get('/findpet.html',function(req,res){
	res.sendFile( __dirname + "/" + "findpet.html" );
	
})
app.get('/doctor.html',function(req,res){
	res.sendFile( __dirname + "/" + "doctor.html" );
	
})

app.post('/process_post',urlencodedParser, function (req, res) {
// Prepare output in JSON format
response = { UserID:req.body.userid, Password:req.body.pwd, };
console.log(req.body)
res.redirect('/project.html')
MongoClient.connect('mongodb://localhost:27017/', function(err, db)
	{ if (err) throw err;
		console.log("Connected to Database");
		var dbo=db.db("webtech");
		dbo.collection('logindetails').insert(response, function(err, result)
			{ if (err) throw err;
				console.log("1 document inserted in your mongodb database" ); });});
				console.log(response); // display in node console window
				res.end(JSON.stringify(response));})


app.post('/Registered',urlencodedParser, function (req, res) {
// Prepare output in JSON format
response = { UserID:req.body.Signupid, email:req.body.emailid ,Password:req.body.pwd1,};
console.log(req.body)

res.redirect('/success.html')
MongoClient.connect('mongodb://localhost:27017/', function(err, db)
	{ if (err) throw err;
		console.log("Connected to Database");
		var dbo=db.db("webtech");
		dbo.collection('Signuppage').insert(response, function(err, result)
			{ if (err) throw err;
				console.log("1 document inserted in your mongodb database" ); });});
				console.log(response); // display in node console window
				res.end(JSON.stringify(response));})
				var server = app.listen(8080, function () {
					var host = server.address().address
					var port = server.address().port
					console.log("Example app listening at http://%s:%s//", host,port)})


app.post('/post_contact',urlencodedParser, function (req, res) {
// Prepare output in JSON format
response = { Name:req.body.Name, Emailid:req.body.email, Subject:req.body.Subject,Message:req.body.message };
console.log(req.body)
res.redirect('/contactsuccess.html')
MongoClient.connect('mongodb://localhost:27017/', function(err, db)
	{ if (err) throw err;
		console.log("Connected to Database");
		var dbo=db.db("mydb");
		dbo.collection('Contactus').insert(response, function(err, result)
			{ if (err) throw err;
				console.log("1 document inserted in your mongodb database" ); });});
				console.log(response); // display in node console window
				res.end(JSON.stringify(response));})
				



const mongoose = require('mongoose');
const methodOverride = require('method-override')
const doctors = require('./models/doctor');

mongoose.connect('mongodb://localhost:27017/special', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.post('/show', async (req, res) => {
    const checkb = (req.body);
    console.log(checkb);
    if (checkb.find_details === undefined) {
        var chn = await doctors.find({ Name: req.body.find });
        if (chn.length !== 0) {
            res.render('show', { doctors: chn });
        }
        else {
            res.send("no Name given");
        }
    }
    else if (checkb.find_details === 'Location') {
        var chn = await doctors.find({Location: req.body.find });
        if (chn.length !== 0) {
            res.render('showp', { doctors: chn });
        }
        else {
            res.send("invalid");
        }
    }
    else if (checkb.find_details === 'Speciality') {
        var chn = await doctors.find({ Speciality: req.body.find  });
        console.log(chn);
        if (chn.length !== 0) {
            res.render('showp', { doctors: chn });
        }
        else {
            res.send("invalid");
        }
    }
    else {
        res.send("Oops!!You got it wrong");
    }
})




