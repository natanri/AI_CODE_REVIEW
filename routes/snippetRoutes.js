const express = require('express');
const router = express.Router();
const snippetController = require("../controllers/snippetController")
const authController = require("../controllers/authController");
const {requireAuth} = require("../middleware/authMiddleware");



//AUTH
router.get("/login", authController.loginForm)
router.get("/register", (req, res) => {
    res.render("register", {error: null, email:""});
});

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);

router.use(requireAuth);

//SNIPPET
router.get("/", snippetController.getHome);
router.get("/snippet/:id", snippetController.getDetail);

//PROTEGIDAS
router.get("/create", snippetController.createForm);
router.post("/create", snippetController.createSnippet);

router.get("/edit/:id", snippetController.editForm);
router.post("/edit/:id", snippetController.updateSnippet);

router.post("/delete/:id", snippetController.deleteSnippet);

module.exports = router;