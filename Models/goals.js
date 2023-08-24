const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    title : {
        type : String, 
        required : true
    },
    date : {
        type : Date, 
        required : true
    }, 
    isCheck : {
        type : Boolean, 
        required : false,
        default : false
    }
}, {
    timestamps : true
}
);

module.exports = mongoose.model('goals', schema);