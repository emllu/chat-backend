const express = require("express");
const router = express.Router();
const { register, login, logout } = require('../controller/register');
const checkingpassword = require('../controller/checkingpassword');
const { userdetail, userUpdate } = require("../controller/userdetail");
const searchUser = require("../controller/searchUser");

// API routing
router.post("/register", register);
router.post('/login', login);
router.post('/verify', checkingpassword);  // Ensure this route is correct
// user details
router.get('/user-detail', userdetail);
router.get('/logout', logout);
router.post('/user-update', userUpdate);
router.post('/search-user',searchUser)
module.exports = router;
