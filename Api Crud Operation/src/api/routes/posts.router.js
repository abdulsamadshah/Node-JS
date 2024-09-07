const express = require("express");
const router = express.Router()

const postControllers = require('../../api/controller/posts.controller')



router.get("/GetBlog", postControllers.getAll);
router.get("/GetBlogById/:id", postControllers.getById)
router.post("/CreateBlog", postControllers.create)
router.put("/UpdateBlog/:id", postControllers.update)
router.delete('/DeleteBlog/:id', postControllers.delete)

module.exports = router;