const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    title : {
        type : String, 
        required : true
    },
    date : {
        type : Date, 
        required : false
    }, 
    
}, {
    timestamps : true
}
);

module.exports = mongoose.model('ideas', schema);