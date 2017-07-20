var mongoose = require('mongoose');
var registration = new mongoose.Schema({
  rollno :{
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true
  },
  branch:{
    type: String
  },
  email:{
    type: String,
    required:true
  },
  mobile: String,
  password:{
    type:String,
    required:true
  },
  picname:String
});

var information = new mongoose.Schema({
  type_one:{
    type:String,
    required:true
  },
  type_two:{
    type:String,
    required:true
  },
  type_three:{
    type:String,
    required:true
  }
});

var new_test_id = new mongoose.Schema({
  test_id:{
    type:String,
    required: true,
    unique: true
  },
  subtype:{
    type:String,
    required: true
  }
});

var test_info = new mongoose.Schema({
  test_id:{
    type:String,
    required: true,
    unique: true
  },
  No_of_q:{
    type:String,
    required:true
  },
  time:{
    type:String,
    required: true
  },
  max_marks:{
    type:Number,
    required: true
  }
});

var test_q_info = new mongoose.Schema({
  test_id:{
    type:String,
    required:true
  },
  qno:{
    type:String,
    required: true
  },
  marks:{
    type:String,
    required: true
  },
  question:{
    type:String,
    required:true
  },
  A:{
    type:String,
    required:true
  },
  B:{
    type:String,
    required:true
  },
  C:{
    type:String,
    required:true
  },
  D:{
    type:String,
    required:true
  },
  right:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  imag:{
    type:String,
    required:true
  }
});

var user_test_info = new mongoose.Schema({
  user_rollo:{
    type:String,
    required:true
  },
  test_id:{
    type:String,
    required:true
  },
  getMarks:{
    type:Number,
    required:true
  },
  maxMarks:{
    type:Number
  },
  date:{
    type:Date,
    required:true
  },
  test_given:{
    type:"String",
    default:"0"
  }
});

var practice = new mongoose.Schema({
  subtype:{
    type:String,
    required:true
  },
  qNo:{
    type:String,
    required:true
  },
  question:{
    type:String,
    required:true
  },
    A:{
    type:String,
    required:true
  },
  B:{
    type:String,
    required:true
  },
  C:{
    type:String,
    required:true
  },
  D:{
    type:String,
    required:true
  },
  right:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
  imag:{
    type:String,
    required:true
  }
});

mongoose.model('practice', practice);
mongoose.model('user_test_info', user_test_info);
mongoose.model('test_question_info', test_q_info);
mongoose.model('test_info', test_info);
mongoose.model('testIdGen', new_test_id);
mongoose.model('types_info', information);
mongoose.model('user_register', registration);
