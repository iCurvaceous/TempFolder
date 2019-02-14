const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BugSchema = new Schema({
    //entry data
    test_num:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    test_conditons:{
        type:String,
        required:true
    },
    game_section:{
        type:String,
        required:true
    },
    test_env:{
        type:String,
        required:true
    },
    procedure:{
        function_tested:{type:String,required:true},
        tester_action:{type:String,required:true},
        expected_result:{type:String,required:true},
        actual_result:{type:String,required:true}
    },
    test_values:{
        type:String,
        required:true
    },
    system_version:{
        type:String,
        required:true
    },
    build_version:{
        type:String,
        required:true
    },
    script_file:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    score:{
        type:Boolean,
        required:true
    },
    status:{
        type:String,
        required:true
    },

    assigned_user:{
        type:String
    },

    date_assigned:{
        type:Date,
        default:Date.now
    },

    //provided data---------------------
    phase:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    project:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true   
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('BugList', BugSchema);