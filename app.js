var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Sameple Code for restful api");
});

// get all user
app.get("/listUsers", function(req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function(err, data) {
    console.log(data);
    res.end(data);
  });
});
let usern = ["user1", "user2", "user3", "user4"];

app.get("/showbyID/:ID", function(req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function(err, data) {
    let ID = req.params.ID;
    var person = JSON.parse(data);
    // var person1 = JSON.stringify(data);

    // let usern_length = usern.length;
    var user_length = Object.keys(person).length;
    // console.log(usern_length);

    // console.log(person[usern[1]].id);
    for (i = 0; i < user_length; i++) {
      if (person[usern[i]].id == ID) {
        console.log(person[usern[i]]);
        let aaa = person[usern[i]];
        res.send(aaa);
      }
    }
  });
});

app.delete("/deleteUser/:ID", function(req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function(err, data) {
    let ID = req.params.ID;
    var person = JSON.parse(data);
    var user_length = Object.keys(person).length;
    for (i = 0; i < user_length; i++) {
      if (person[usern[i]].id == ID) {
        // console.log(person[usern[i]]);
        // let aaa = person[usern[i]];
        // res.send(aaa);
        delete person[usern[i]];
      }
    }
    console.log(person);
    res.send(person);
  });
});

var user = {
  user4: {
    name: "mohit",
    password: "password4",
    profession: "teacher",
    id: 4
  }
};

app.post("/addUser", function(req, res) {
  // First read existing users.
  var json = req.body;
  fs.readFile(__dirname + "/" + "users.json", "utf8", function(err, data) {
    data = JSON.parse(data);
    data["user4"] = req.body;
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

var server = app.listen(8080, () => {
  var port = server.address().port;
  console.log("sample code for restful api run at ", port);
});
