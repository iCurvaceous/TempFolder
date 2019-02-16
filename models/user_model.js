const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    company_name:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true   
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    group:{
        type:String,
        default:"Programmer"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('UserList', UserSchema);