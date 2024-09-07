const express = require('express');
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//----------------Database Connection -------------------------- //
const connection = require("./config/db");

//------------- Body Parser package get Html input Data ----------------//
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ------------- Read Data -------------------------------- //
app.set("view engine", "ejs");

//------------------------ Url -------------------- //

app.use(express.static('public/html/'));
app.use(express.static('/views'));


//------------------------ Default Page -------------------//
app.get("/", (req, res) => {
    res.redirect("create.html")
});



//------------------------ Post ------------------- //
app.post("/create", (req, res) => {
    console.log(req.body);
    const name = req.body.name; // accessing request body for name
    const email = req.body.email; // accessing request body for email

    try {
        connection.query("INSERT into crud (name, email) VALUES (?, ?)", [name, email], (error, rows) => {
            if (error) {
                console.log(error);
                res.status(500).send("Error while inserting data into database");
            } else {
                console.log("Data inserted successfully");
                res.redirect("/data")
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

//-------------------------- Get -----------------//
app.get("/data", (req, res) => {
    connection.query("select * from crud", (error, rows) => {
        if (error) {
            console.log(error);
        } else {
            res.render("read.ejs", { rows });
        }
    })
});


// ----------------------- Delete ------------------ //
app.get("/delete-data", (req, res) => {
    const deletedquery = "delete from crud where id=?";
    connection.query(deletedquery, [req.query.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/data")
        }
    })
});


// ----------------------------- Update Operation ---------------- //

// taking data with update page will be go
app.get("/update-data", (req, res) => {

    connection.query("select * from crud where id=?", [req.query.id], (err, eachRow) => {
        if (err) {
            console.log(err);
        } else {
            result = JSON.parse(JSON.stringify(eachRow[0]));
            console.log(result);
            res.render("edit.ejs", { result });
        }
    })
});

//update

app.post("/final-update", (req, res) => {
    const id = req.body.hidden_id;
    const name = req.body.name;
    const email = req.body.email;

    console.log("id..", id);

    const updateQuery = "UPDATE crud SET name=?, email=? WHERE id=?";
    try {
        connection.query(updateQuery, [name, email, id], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/data");
            }
        })
    } catch (err) {
        console.log(err);
    }

});



app.listen(process.env.PORT || 4000, (error) => {
    if (error) throw error;

    console.log('Server running this port');
})