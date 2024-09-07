
const connection = require("../../config/db");



const postControllers = {
    //------------- Get Method ------------------ //
    getAll: async (req, res) => {
        try {
            const [rows, field] = await connection.query("select * from posts")

            if (rows.length != 0) {
                res.json({
                    data: rows,
                    message: "Data Fetch Success",
                    status: true,
                })
            } else {
                res.json({
                    message: "No Data Found",
                    status: true,
                })
            }

        } catch (e) {
            res.json({
                message: "Something Went Wrong",
                status: false,
            })
        }
    },
    

    //------------- Get By Id Method ------------------ //

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, field] = await connection.query('select * from posts where id = ?', [id]);
            res.json({
                data: rows,
                status: true,
                message: "Data Fetch Success",
            })
        } catch (e) {
            res.json({
                status: true,
                message: "Something Went Wrong",
            })
        }

    },

    //------------- Post Method ------------------ //

    create: async (req, res) => {
        try {
            const { title, content } = req.body;
            const sql = "insert into posts (title,content) values ( ?, ?)";
            const [rows, fields] = await connection.query(sql, [title, content]);

            res.json({
                data: fields,
                status: true,
                message: "Blog Post Success"
            })

        } catch (error) {

            res.json({
                status: false,
                message: error
            })
        }
    },

    //------------- Update Method ------------------ //
    update: async (req, res) => {
        try {

            const { title, content } = req.body;
            const { id } = req.params;

            const sql = "update posts set title=?, content=? where id=?";
            const [rows, fields] = await connection.query(sql, [title, content, id]);

            res.json({
                status: true,
                message: "Post Updated Success",
                data: [rows]

            })

        } catch (e) {
            res.json({
                status: false,
                message: "Something Went Wrong",
            })
        }



    },

    //------------- Delete Method ------------------ //
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const sql = "DELETE FROM posts WHERE id=?";
            const [rows, fields] = await connection.query(sql, [id]);

            res.json({
                data: rows,
                status: true,
                message: "Post Deleted Success",
            })
        } catch (e) {
            res.json({
                status: false,
                message: e,
            })
        }

    }

};
module.exports = postControllers;