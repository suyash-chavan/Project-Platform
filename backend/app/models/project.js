const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    university: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    tags:[{
        type: String
    }],
    stack: [{
        type: String
    }],
    respect: {
        type: Number,
        default: 0
    },
    abstract: {
        type: String
    },
    semester: {
        type: Number,
        default: 1
    },
    students: [{
        type: mongoose.Types.ObjectId
    }],
    repoLink: {
        type: String,
        required: true,
        unique: true
    },
    otherLinks: [{
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = {Project};