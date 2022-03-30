const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    university: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    githubAccessKey: {
        type: String,
        unique: true
    },
    gitlabAccessKey: {
        type: String,
        unique: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = {Student};