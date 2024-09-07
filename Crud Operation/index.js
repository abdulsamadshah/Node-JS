const express = require("express");
const multer = require('multer'); // Image Upload
const dotenv = require("dotenv");
const path = require('path'); // Importing the path module
const fs = require('fs'); // Importing the filesystem module
const bodyParser = require("body-parser");
const pool = require("./src/config/db"); // Import the promise-based pool

dotenv.config();

const app = express();

app.set("view engine", "ejs");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(express.json()) 

app.use(express.static('public/html'));

app.set("views", path.join(__dirname, 'src/views'));

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
const  movieRouter=require("./src/routes/Movie.route");

//---------------------------- Api --------------------------- //
app.use('/api/',movieRouter);

const uploadDir = path.join(__dirname, 'src/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.get("/AddMovie", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/addmovie.html'));
});

app.post("/Postaddmovie", upload.single('mimage'), async (req, res) => {
    try {
        console.log("ReqData: ", req.body);
        console.log("File: ", req.file);

        const { title, Category, realeaseyear, mdescription } = req.body;
        const mimage = req.file ? req.file.filename : null;

        if (!title || !Category || !realeaseyear || !mdescription || !mimage) {
            return res.status(400).send("All fields (title, Category, realeaseyear, mdescription, mimage) are required");
        }

        const connection = await pool.getConnection();
        try {
            await connection.query(
                "INSERT INTO movie (title, Category, realeaseyear, mdescription, mimage) VALUES (?, ?, ?, ?, ?)",
                [title, Category, realeaseyear, mdescription, mimage]
            );
            console.log("Movie Added Successfully");
            res.redirect("/Movielist");
        } finally {
            connection.release();
        }
    } catch (e) {
        console.error("Internal Server Error:", e);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/Movielist", async (req, res) => {
    try {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("SELECT * FROM movie");
            console.log("Results:", result);
            res.render("movielist", { result });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(400).send("Error fetching movies");
    }
});

app.get("/EditMovie", async (req, res) => {
    try {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("SELECT * FROM movie WHERE id=?", [req.query.id]);
            if (result.length === 0) {
                return res.status(404).send("Movie not found");
            }
            const movie = JSON.parse(JSON.stringify(result[0]));
            console.log("Result Fetched Success", movie);
            res.render("editmovie.ejs", { result: movie });
        } finally {
            connection.release();
        }
    } catch (e) {
        console.error("Exception in EditMovie:", e);
        res.status(400).send("Something Went Wrong");
    }
});

app.post("/UpdateMovie", upload.single("mimage"), async (req, res) => {
    try {
        const { title, Category, realeaseyear, mdescription, hidden_id } = req.body;
        const mimage = req.file ? req.file.filename : null;

        let updateurl = "UPDATE movie SET title=?, Category=?, realeaseyear=?, mdescription=?";
        let parameters = [title, Category, realeaseyear, mdescription];

        if (mimage) {
            updateurl += ", mimage=?";
            parameters.push(mimage);
        }

        updateurl += " WHERE id=?";
        parameters.push(hidden_id);

        const connection = await pool.getConnection();
        try {
            await connection.query(updateurl, parameters);
            console.log("Updated Successfully");
            res.redirect("/Movielist");
        } finally {
            connection.release();
        }
    } catch (e) {
        console.error("Exception in UpdateMovie:", e);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/DeleteMovie", async (req, res) => {
    const selectUrl = "SELECT mimage FROM movie WHERE id=?";
    const deleteUrl = "DELETE FROM movie WHERE id=?";
    let parameters = [req.query.id];

    try {
        const connection = await pool.getConnection();
        try {
            const [results] = await connection.query(selectUrl, parameters);
            if (results.length === 0) {
                return res.status(404).send("Movie record not found");
            }

            const movie = results[0];
            const imagePath = path.join(__dirname, 'src/uploads', movie.mimage);

            await connection.query(deleteUrl, parameters);
            fs.unlink(imagePath, (unlinkError) => {
                if (unlinkError) {
                    console.error("Failed to delete image file:", unlinkError);
                } else {
                    console.log("Deleted image file successfully");
                }
            });

            res.redirect("/Movielist");
        } finally {
            connection.release();
        }
    } catch (ex) {
        console.error("Exception in DeleteMovie:", ex);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/ViewMovies", async (req, res) => {
    try {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("SELECT * FROM movie WHERE id=?", [req.query.id]);
            if (result.length === 0) {
                return res.status(404).send("Movie not found");
            }
            const movie = JSON.parse(JSON.stringify(result[0]));
            console.log("Result Fetched Success", movie);
            res.render("ViewMovie.ejs", { result: movie });
        } finally {
            connection.release();
        }
    } catch (e) {
        console.error("Exception in ViewMovies:", e);
        res.status(400).send("Something Went Wrong");
    }
});

app.listen(process.env.PORT || 4000, (error) => {
    if (error) throw error;
    console.log('Server running on port ' + (process.env.PORT || 4000));
});
