const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

dotenv.config();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
const sessionStore = new MySQLStore({

    port: process.env.DB_PORT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
app.use(session({
    secret: "FoodPanda",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}));

// ------------- Read Data -------------------------------- //
app.set("view engine", "ejs");

//----------------Database Connection -------------------------- //
const connection = require("./config/db");
const { error, Console } = require("console");
const { stringify } = require("querystring");
const { Json } = require("sequelize/lib/utils");

//------------------------ Url -------------------- //
app.use(express.static('public/html/'));
app.use(express.static('/views'));
app.use(express.static("public"));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

//----------------------- Multer ------------------------ //
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Make sure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

//----------------------- Method ------------------------ //
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        console.log("User is authenticated:", req.session.user);
        next();
    } else {
        console.log("User is not authenticated, redirecting to login");
        res.redirect('Login.html'); // User is not authenticated, redirect to login page
    }
}

app.post('/Registeration', upload.fields([{ name: 'Pan_Photo' }, { name: 'Gst_Photo' }]), (req, res) => {
    try {
        const { Name, Email_Id, MobileNo, Password, Date_of_Birth, Business_Name, Pan_Number, Gst_Number, Address } = req.body;

        const Pan_Photo = req.files['Pan_Photo'] ? req.files['Pan_Photo'][0].filename : null;
        const Gst_Photo = req.files['Gst_Photo'] ? req.files['Gst_Photo'][0].filename : null;
        if (Pan_Photo == "") {
            alert("Upload Pan Card");
        } else if (Gst_Photo == "") {
            alert("Upload Gst Image");
        } else {
            let Url = "INSERT INTO companyregisterataion (Name, Email_Id, MobileNo, Password, Date_of_Birth, Business_Name, Pan_Number, Gst_Number, Address, Pan_Photo, Gst_Photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            let parameters = [Name, Email_Id, MobileNo, Password, Date_of_Birth, Business_Name, Pan_Number, Gst_Number, Address, Pan_Photo, Gst_Photo];

            connection.query(Url, parameters, (error, result) => {
                if (error) {
                    res.status(400).send("Something Went Wrong");
                    console.log(error);
                } else {
                    console.log("Registration Successful");
                    res.redirect("/login")
                }
            });
        }
    } catch (error) {
        res.status(400).send("Something Went Wrong");
        console.log(error);
    }
});

app.post("/LoginData", (req, res) => {
    const { Email_Id, Password } = req.body;
    try {
        let Url = "SELECT * FROM companyregisterataion where Email_Id = ? AND Password = ?";
        let parameters = [Email_Id, Password];
        connection.query(Url, parameters, (error, result) => {
            if (error) {
                return res.status(400).send("Something went wrong");
            }
            else {
                if (result.length > 0) {
                    req.session.user = result[0];
                    console.log('Session User Set:', req.session.user); // Debug log
                    res.redirect("/Dashboard");
                } else {
                    return res.status(400).send("Invalid email or password");
                }
            }
        });
    } catch (error) {
        return res.status(400).send("Internal Server Error");
    }
});

app.post("/AddCategory", isAuthenticated, upload.single("Category_Image"), (req, res) => {
    try {
        const { Category_Name } = req.body;
        let Category_Image = req.file ? req.file.filename : null;
        const Seller_id = req.session.user.Seller_id; // Assuming user ID is stored in session


        const Url = "INSERT INTO category (Category_Name, Category_Image, Seller_id) VALUES (?, ?, ?)";
        const Parameters = [Category_Name, Category_Image, Seller_id];

        connection.query(Url, Parameters, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                console.log("Category Added Success");
                res.redirect("/Category")
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


app.get("/Category", isAuthenticated, (req, res) => {
    try {
        const Seller_id = req.session.user.Seller_id;
        const Url = "SELECT * FROM category WHERE Seller_id = ?";
        const Parameters = [Seller_id];
        connection.query(Url, Parameters, (error, result) => {
            if (error) {
                console.log("Errors:", error);
                req.status(400).send("Something Went wrong");
            } else {
                const resultReverseData = result.reverse();
                res.render('Category.ejs', { "result": resultReverseData });
            }
        });

    } catch (error) {
        console.log("Errors:", error);
        res.status(400).json({ success: false, message: 'Unexpected error', error: error.message })
    }
});

app.get("/EditCategorys", isAuthenticated, (req, res) => {
    try {
        let Category_id = req.query.Category_id;
        console.log("CategoryId", Category_id);
        const Url = "Select * from category where Category_id=?";
        const Parameters = [Category_id];
        connection.query(Url, Parameters, (error, result) => {
            if (error) {
                console.log("Errors:", error);
                req.status(400).send("Something Went wrong");
            } else {
                const resultData = result[0];
                res.render('EditCategory.ejs', { "result": resultData });
            }
        });

    } catch (error) {
        console.log("Errors:", error);
        res.status(400).json({ success: false, message: 'Unexpected error', error: error.message })
    }
});


app.post("/UpdateCategory", isAuthenticated, upload.single("Category_Image"), (req, res) => {
    try {
        const { Category_Name, Category_id } = req.body;
        let Category_Image = req.file ? req.file.filename : null;
        var Url = "UPDATE category SET Category_Name=?";
        let Parameters = [Category_Name];

        if (Category_Image) {
            Url += ",Category_Image=?";
            Parameters.push(Category_Image);
        }

        Url += " WHERE Category_id = ? ";
        Parameters.push(Category_id);

        connection.query(Url, Parameters, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                res.redirect("/Category")
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/DeleteCategory", (req, res) => {
    try {

        const SelectCategoryUrl = "SELECT Category_Image FROM category WHERE Category_id=?";
        const Url = "DELETE FROM category WHERE Category_id=?";
        let Parameters = [req.query.Category_id];

        connection.query(SelectCategoryUrl, Parameters, (CatergoryError, CategoryResult) => {

            if (CatergoryError) {
                res.status(400).json({ success: false, message: 'Unexpected error', error: error.message })
            } else {
                const Category_Image = CategoryResult[0];
                const Category_ImagePath = path.join(__dirname, 'uploads', Category_Image.Category_Image);

                connection.query(Url, Parameters, (error, result) => {
                    if (error) {
                        console.log("Error:", error);
                        res.status(400).send("Something went Wrong");
                    } else {
                        fs.unlink(Category_ImagePath, (unlinkError) => {
                            if (unlinkError) {
                                res.status(400).json({ success: false, message: 'Unexpected error', error: unlinkError })
                            } else {
                                console.log("Deleted Successs");
                                res.redirect('/Category');
                            }
                        });

                    }
                });

            }
        });




    } catch (error) {
        console.log(error);
    }
});



app.get("/getCategoryName", (req, res) => {
    try {
        const Url = "SELECT Category_Name FROM category";
        connection.query(Url, (error, result) => {
            if (error) {
                console.log("Errors:", error);
                res.status(400).send("Something Went wrong");
            } else {
                const CategoryName = result.map(result => result.Category_Name);
                console.log("CategoryName:", CategoryName);
                res.json({ success: true, categories: CategoryName });
            }
        });
    } catch (error) {
        console.log("Errors:", error);
        res.status(500).json({ success: false, message: 'Unexpected error', error: error.message });
    }
});


app.post("/AddProduct", isAuthenticated, upload.single("Product_Image"), (req, res) => {
    try {
        const { Product_name, Product_Price, Product_Discount, Product_Qty, Product_StockQty, Product_Type, Product_Description, Category_Name } = req.body;
        let Product_Image = req.file ? req.file.filename : null;
        const Seller_id = req.session.user.Seller_id;


        const Url = "INSERT INTO products (Product_name, Product_Price, Product_Discount,Product_Qty, Product_StockQty, Product_Type, Product_Description, Category_Name, Seller_id, Product_Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const Parameters = [Product_name, Product_Price, Product_Discount, Product_Qty, Product_StockQty, Product_Type, Product_Description, Category_Name, Seller_id, Product_Image];

        connection.query(Url, Parameters, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                console.log("Product Added Success");
                res.redirect("/Product")
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

});


//------------------- Product --------------------- //
app.get("/Product", isAuthenticated, (req, res) => {
    try {
        const Seller_id = req.session.user.Seller_id;
        const Url = "SELECT * FROM products where Seller_id = ?";
        const Parameters = [Seller_id];

        connection.query(Url, Parameters, (error, result) => {
            if (error) {
                res.status(400).json({ success: false, message: 'Unexpected error', error: error.message })
            } else {
                console.log("ResultData:",result)
                res.render("Product.ejs", { result });
            }
        })

    } catch (error) {
        res.status(400).json({ success: false, message: 'Unexpected error', error: error.message })

    }
})


//------------------------- Routes ------------------------//
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/Login.html'));
});

app.get("/Dashboard", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.get("/Registeration", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/Register.html'));
});

app.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log("errors", error);
        } else {
            res.redirect("/login");
        }
    });
});

app.get("/AddCategory", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/AddCategory.html'));
});

app.get("/AddProduct", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/AddProduct.html'));
});

app.listen(process.env.PORT || 4000, (error) => {
    if (error) throw error;
    console.log('Server running on port ' + (process.env.PORT || 4000));
});
