var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var url = require('url');
var cors = require('cors');
var nodemailer = require('nodemailer');
const { MongoClient } = require("mongodb");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.text());
app.use(express.static("public"));

// app.use(cors());

// app.options('*', cors()); // include before other routes

// app.use(function(req, res, next) { //allow cross origin requests
//     res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//     res.header("Access-Control-Allow-Origin", "http://localhost:4400");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Max-Age", 3600);
//     next();
// });

// app.get("/", function(req, res){   
//     res.sendFile(__dirname + "/index.html");  
// });

const username = encodeURIComponent("Sreekar");
const password = encodeURIComponent("Sreekar@2003");

mongoose.connect(`mongodb+srv://${username}:${password}@pmp-cms.f4bdhuo.mongodb.net/PMP`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// mongoose.connect("mongodb://0.0.0.0:27017/PMP", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

console.log("Connected");

const schema = new mongoose.Schema ({
    username: String,
    email: String,
    phonenumber: Number,
    mentor: String,
    coordi: String,
    password: String,
});

const complaintSchema = new mongoose.Schema ({
    username: String,
    email: String,
    type: String,
    complaint: String,
    created: Date,
});

const NewUser = mongoose.model("NewUser", schema);
const Complaint = mongoose.model("Complaint", complaintSchema);

// module.exports = User;
// export function find(){
//     return User.find({});
// };

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})

app.post("/new", async function(req,res){
    console.log(req.body);

    // if (!req.body.email) {
    //     // res.status(400).send({ message: "Content can not be empty!" });
    //     res.send(false);
    //     // res.status(200);
    //     return;
    // }
    // else{
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let cpass = req.body.cpass;
        let phonenumber = req.body.phonenumber;
        let mentor = req.body.mentor;
        let coordi = req.body.coordi;

        const broken = email.split('@');
        console.log(broken[1]);
        if(broken[1] !== "goa.bits-pilani.ac.in"){
            res.send(false);
        }
        else{
            const user1 = await NewUser.findOne({ email: req.body.email });

        if(password == cpass && user1 == null){
            const user2 = new NewUser({
                username: username,
                email: email,
                password: password,
                phonenumber: phonenumber,
                mentor: mentor,
                coordi: coordi,
                created: new Date(Date.now()),
            });
        
            user2.save();
            res.send(true);
        }
        
        res.status(200);
        }

        
        
    // }
    // exit('1');
    // res.send(res.body);
   
});

app.post("/ent", async function(req,res){

    // let loginObj = {
    //     username: req.body.username,
    //     password: req.body.password,
    // };
    console.log(req.body);

    var email = req.body.email;
    var password = req.body.password;

    // console.log(username);

    const user = await NewUser.findOne({ email: req.body.email });

    console.log(user);

    if (user != null) {
        //check if password matches
        const result = req.body.password === user.password;
        console.log(result);
        // bcrypt
        //     .compare(password, hash)
        //     .then(result = true)
        if (result) {
        //   res.render("list");
            // res.sendFile(__dirname + "/home.html");
            console.log(result);
            res.status(200);
            if(req.body.email === 's@goa.bits-pilani.ac.in'){
                res.send({result: true, role: 'Admin'});
            }
            else{
                res.send({result: true, role: 'User'});
            }
        } else {
        //   res.sendStatus(400).json({ error: "password doesn't match" });
          res.send(false);
        // res.redirect('/login');
            // res.send("Password incorrect. Please try again");
        }
    } 
    else {
        res.send(false);
        // res.status(400).json({ error: "User doesn't exist" });
        // res.send("Username does not exist. Please try again or Register");
    }

});

app.post("/prob", async function(req, res){

    console.log(req.body);
    console.log(req.body.email);

    let complaintdata = await NewUser.find({email: req.body.email});
    console.log(complaintdata);

    let username = complaintdata[0].username;
    let email = req.body.email;
    // var phonenumber = req.body.phonenumber;
    // var mentor = req.body.mentor;
    // var coordi = req.body.coordi;
    let type = req.body.type;
    let complaint = req.body.complaint;

    // if(email === "s@gmail.com"){
        // res.sendFile(__dirname + "/admin.html");

        // app.get("/", function (req, res) {   
        //     User.find().then (function (allDetails) {
        //         res.render("list.ejs", { details: allDetails })
        //     })
        // });

        // app.get("/getdetails", function(req,res){
        //     console.log("Hello");
        // });

        // const nonarr = User.find();

        // const details = Array.from(nonarr);
        
        // // console.log(details);

        // res.render("list", {details: details});


        
        // User.find().then (function (allDetails) {
        //     res.render("list.ejs", { details: allDetails });
        // });
        // res.status(200);
        // res.send(true);



        // app.get("/search/:key", async (req, res) => {
        //     let data = await User.find({
        //         "$or": [
        //             {name: {$regex:req.params.key}}
        //         ]
        //     });
        // });

        // res.sendFile(__dirname + "/views/data.html");


        // if(coordiname == " "){
        //     // const data = User.find();
        //     // res.send(User.find());

        //     User.find({}, {projection: {_id: 0}});

        // }
        // else{
        //     res.send(User.find({coordi: coordiname}));
        // }
    // }
    if(complaintdata != null){
        const complaint1 = new Complaint({
            // username: username,
            email: email,
            // phonenumber: phonenumber,
            // mentor: mentor,
            // coordi: coordi,
            type: type,
            complaint: complaint,
            created: new Date(Date.now())
        });
    
        complaint1.save();
        // console.log(comp);
        // res.sendFile(__dirname + "/submit.html");

        res.status(200);
        res.send(true);
    }

    
});

app.get("/coordi", async function(req,res){
    // Complaint.find().then(function(postdata){
    //     res.send(postdata);
    // });
    let usercomplaints = await NewUser.aggregate([
        {
            $lookup: {
                from: "complaints",
                localField:"email",
                foreignField:"email",
                as: "complaints"
            }
        },
        {$unwind: '$complaints'},
    ]);
    console.log(usercomplaints);
    res.send(usercomplaints);
});

app.get("*",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})

app.listen(8000, function(){
    console.log("Server is running on port 8000");
});
