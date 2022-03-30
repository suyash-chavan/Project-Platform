const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    domainName: {
        type: String,
        required: true,
        unique: true
    },
    studentAuthAPI: {
        type: String
    },
    professorAuthAPI: {
        type: String
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

const University = mongoose.model('University', universitySchema);

module.exports = {University};