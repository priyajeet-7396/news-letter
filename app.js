const express  = require("express");
const bodyParser  = require("body-parser");
const request  = require("request");
const https  = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

    const firstNAME = req.body.fname;
    const lastNAME = req.body.lname;
    const email = req.body.email;
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME : firstNAME,
                    LNAME : lastNAME
                }
            }
        ]
    }

    const jasonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/f501a06791";
    const options = {
        method: "post",
        auth: "priyajeet:bd42889cbd12ff7be5f8785be02de725-us21"
    }

    const request =  https.request(url,options, function(response){
        if(response.statusCode ===200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jasonData);
    request.end();


})

app.post("/failure",function (req,res){
    res.redirect("/")
})


 

app.listen(process.env.PORT || 3000, function() {
    console.log("server is running")
})




// api key
// bd42889cbd12ff7be5f8785be02de725-us21
// audience id
// f501a06791