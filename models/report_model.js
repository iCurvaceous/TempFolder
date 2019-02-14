const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
//Data can be provided or created
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    phase:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('ReportList', ReportSchema);