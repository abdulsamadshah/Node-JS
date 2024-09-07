const { createProject, getAllProject, getProjectById, updateProject, deleteProject } = require('../controller/projectcontroller');
const { authentication, restrictTo } = require('../controller/authcontroller');

const router = require('express').Router();

router.route("/").post(authentication, restrictTo('2'), createProject);
router.route("/").get(authentication, restrictTo('2'), getAllProject);
router.route("/:id").get(authentication, getProjectById);
router.route("/UpdateProject/:id").patch(authentication, updateProject);
router.route("/deleteProject/:id").delete(authentication, deleteProject);





module.exports = router;