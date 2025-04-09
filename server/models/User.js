const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
    },
    certificates: [
        {
            certificateId: String,
            courseName: String,
            date: String,
        }
    ],
    bio: {
        type: String,
        default: "Student"
    },
    phone: {
        type: String,
        default: "+91 1234567890"
    },
});

module.exports = mongoose.model('User', userSchema);
