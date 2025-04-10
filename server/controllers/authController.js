const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.BACKEND_URL;


exports.register = async (req, res) => {
    try {
      const { firstName, lastName, email, phone, password } = req.body;
  
      if (!firstName || !email || !password || !lastName || !phone) {
        return res.status(400).json({ message: 'Please enter all fields' });
      }
  
      // Optional profile image upload
      let fileUrl = '';
      if (req.file) {
        fileUrl = `${url}/api/auth/file/${req.file.filename}`;
      }
  
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'An account with this email already exists' });
      }
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        firstName,
        lastName,
        phone,
        profileImg: fileUrl || '', // Empty string if no file uploaded
        email,
        password: passwordHash,
      });
  
      const savedUser = await newUser.save();
  
      const payload = {
        user: {
          id: savedUser.id,
        },
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
  
      res.status(201).json({ token, message: 'User registered successfully' });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.status(200).json({ token, message : "User logged in successfully"});
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateUserDetails = async (req, res) => {
    const formData = req.body;

    try {
        const user = await User.findById(formData.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { firstName, lastName, phone, bio } = formData;
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (phone) user.phone = phone;
        if (bio) user.bio = bio;

        if (req.file) {
            const fileUrl = `${url}/api/auth/file/${req.file.filename}`;
            user.profileImg = fileUrl;
        }

        await user.save();

        res.status(200).json({ message: "User details updated", user });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.addCertificateToUser = async (req, res) => {
    const { userId, certificateId, courseName, date } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check for duplicate certificateId
        const alreadyExists = user.certificates.some(cert => cert.certificateId === certificateId);
        if (alreadyExists) {
            return res.status(400).json({ message: "Certificate already exists for this user." });
        }

        // Add new certificate
        user.certificates.push({ certificateId, courseName, date });
        await user.save();

        res.status(200).json({ message: "Certificate added", certificates: user.certificates });
    } catch (error) {
        console.error("Error adding certificate:", error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.verifyCertificate = async (req, res) => {
    const { certificateId } = req.body;

    try {
        const user = await User.findOne({ "certificates.certificateId": certificateId });
        if (!user) return res.status(404).json({ message: "Certificate not found" });

        res.status(200).json({ message: "Certificate verified", userData: user });
    } catch (error) {
        console.error("Error verifying certificate:", error);
        res.status(500).json({ message: "Server error" });
    }
}

let gridFsBucket;

mongoose.connection.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "fs", // Updated to match your actual bucket name
  });
});

exports.getImage = async (req, res) => {
    try {
      if (!gridFsBucket) {
        return res.status(500).json({ message: "GridFSBucket is not initialized" });
      }
  
      const fileCollection = mongoose.connection.db.collection("fs.files"); // Ensure this matches your bucket
      const file = await fileCollection.findOne({ filename: req.params.filename });
  
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
  
      res.set("Content-Type", file.contentType);
  
      const readStream = gridFsBucket.openDownloadStream(file._id);
      readStream.pipe(res);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ error: error.message });
    }
  };