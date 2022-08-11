const Note = require('../models/note');
module.exports.home = function(req,res){
    console.log("request");
    Note.find({} , function(err, notes){
        if(err){
            console.log("Error in fetching notes");
            return;
        }
        res.setHeader('Access-Control-Allow-Origin', 'https://notesshare.shubhamgoel24.me');
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        return res.status(200).json({
            note:notes
        });
    });
};

module.exports.create_note= async function(req,res){
    try{
        let note = await Note.create({
            description: req.body.description
        });
        
        res.setHeader('Access-Control-Allow-Origin', 'https://notesshare.shubhamgoel24.me');
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        return res.status(200).json({
            data: {
                note : note
            },
            message: "Note Created!"
        });
    }catch(err){
        console.log("Error in creating note" + err);
        return;
    }
};

function fil(id) {
    return id != "62f4ece0c5f65d6ff9b60054";
  }
module.exports.delete_note=function(req,res){
    try{
        let id=req.query.id;
        var xy = JSON.parse(id);
        xy=xy.filter(fil);
        xy.forEach(idno => {
            Note.findByIdAndDelete(idno,function(err){
                if(err){
                    console.log('Error in deleting an object from database');
                    return;
                }
            });
        });
        res.setHeader('Access-Control-Allow-Origin', 'https://notesshare.shubhamgoel24.me');
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        return res.status(200).json({
            message: "Deleted Sucessfully !"
        });
    }catch(err){
        console.log("Error in deleting note" + err);
        return;
    }
};