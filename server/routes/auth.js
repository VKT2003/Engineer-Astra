const express = require('express');
const router = express.Router();
const { register, login, getUserById, addCertificateToUser, getImage, updateUserDetails, verifyCertificate } = require('../controllers/authController');
const upload = require('../config/multerConfig');


router.post('/register',upload.single("file"), register);
router.post('/login', login);
router.post('/addCertificate', addCertificateToUser);
router.post('/verifyCertificate', verifyCertificate);
router.get('/getUserById/:id', getUserById)
router.get("/file/:filename", getImage);
router.put("/updateUser", upload.single("file"), updateUserDetails);

module.exports = router;
