const express = require("express")
const session = require('express-session');

const app = express();


const dotenv = require("dotenv");
dotenv.config();

// ------------- Read Data -------------------------------- //
app.set("view engine", "ejs");


//----------------Database Connection -------------------------- //
const connection = require("./config/db");

//------------- Body Parser package get Html input Data ----------------//
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'keys', // Change this to a random string
    resave: false,
    saveUninitialized: false
}));

//------------------------ Url -------------------- //

app.use(express.static('public/html/'));
app.use(express.static('/views'));


//------------------------ Default Page -------------------//

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login'); // User is not authenticated, redirect to login page
    }
}


app.get("/", isAuthenticated, (req, res) => {

    if (req.session.user) {
        console.log("User is authenticated:", req.session.user);

        const email = req.session.user.email; // Retrieve user email from session
        const profileQuery = 'SELECT * FROM Users WHERE email = ?';

        connection.query(profileQuery, [email], (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Error retrieving user data");
            }

            if (rows.length > 0) {
                // User data found, render profile page with user data
                console.log("User data found:", rows[0]);
                res.render("Profile.ejs", { user: rows[0] });// Redirect to Profile page
            } else {
                // User data not found, send an error response
                console.log("User data not found");
                res.status(404).send("User data not found");
            }
        });
    } else {
        console.log("User is not authenticated");
        res.redirect("/login"); // Redirect to login page if user is not authenticated
    }
});




app.get("/login", (req, res) => {
    res.redirect("Login.html")
});

app.get("/Register", (req, res) => {
    res.redirect("Register.html")
});


app.get("/Profile", isAuthenticated, (req, res) => {
    res.render("Profile.ejs", { user: req.session.user });
});


//------------------------ Authentication ------------------- //

app.post("/LoginData", (req, res) => {
    const { email, password } = req.body; // Destructure email and password from request body
    try {
        const login_query = 'SELECT * FROM Users WHERE email = ? AND password = ?';
        connection.query(login_query, [email, password], (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Error while logging in");
            }
            if (rows.length > 0) {
                // Authentication successful
                req.session.user = rows[0]; // Store user data in session
                console.log("Login User Data:", rows[0]);
                res.render("Profile.ejs", { user: rows[0] });// Redirect to Profile page
                console.log("Login Successful");

            } else {
                console.log("Invalid email or password");
                res.status(401).send("Invalid email or password");
                res.redirect('/login'); // Redirect to login page
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});



app.post("/RegisterData", (req, res) => {
    const { name, email, password } = req.body;
    try {
        connection.query("INSERT into Users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Error while inserting the data");
            } else {
                console.log("Registration Successfully");
                res.redirect('/login'); // Redirect to login page after successful registration
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Logout route
app.get("/logout", (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Error logging out");
        } else {
            // Redirect the user to the login page after logout
            res.redirect("/login");
        }
    });
});





app.listen(process.env.PORT || 4000, (error) => {
    if (error) throw error;

    console.log('Server running this port');
})



