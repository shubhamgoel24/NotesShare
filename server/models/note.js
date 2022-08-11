const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    }
},{ timestamps: true });

const Note = mongoose.model('Note',noteSchema);
module.exports = Note;