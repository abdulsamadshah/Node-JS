const connection = require("../config/db");

const movieControllers = {
    Movielist: async (req, res) => {
        try {

            const [rows, fields] = await connection.query("select * from movie");
            if (rows.length == 0) {
                res.json({
                    status: true,
                    message: "Data Fetched Success",
                    movielist: rows
                })

            } else {
                res.json({
                    status: true,
                    message: "No Data Found",
                    movielist: rows
                })
            }

        } catch (e) {
            res.json({
                message: "Something Went Wrong",
                status: false,
            })
        }
    }
}

module.exports=movieControllers;