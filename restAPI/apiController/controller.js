var mongoose = require('mongoose');
var url =  require('url');
var bcrypt = require('bcrypt');
const saltRounds = 10;
mongoose.Promise = global.Promise;

var register = mongoose.model('user_register');
var information = mongoose.model('types_info');
var questions_select = mongoose.model('practice');
var new_test_id = mongoose.model('testIdGen');
var test_info = mongoose.model('test_info');
var test_q_info = mongoose.model('test_question_info');
var user_test_info = mongoose.model('user_test_info');
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res, next)
{
  var roll = req.body.roll;
  var name = req.body.name;
  var branch = req.body.branch;
  var email = req.body.email;
  var mobile = req.body.mob;
  var password = req.body.pass1;
  var picname = req.body.picname;
  // console.log("picname is "+picname);
  register.find().where({rollno:roll}).exec(function(err, resul){
    if(err){
      // console.log("Inside error");
      sendJSONresponse(res, 400, err);
    }else {
      // console.log("Inside else");
      // console.log(resul);
      var len = resul.length;
      if(len != 0)
      {
        // console.log("user already registered");
        sendJSONresponse(res, 375, err);
      }
      else {
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(req.body.pass1, salt, function(err, hash) {
            register.create({
            rollno: roll.trim(),
            name: name.trim(),
            branch:branch.trim(),
            email:email.trim(),
            mobile:mobile.trim(),
            password:hash,
            picname:picname.trim()
          }, function(err, location){
                if(err){
                  // console.log("here inside");
                  // console.log("error starts here" + err);
                  sendJSONresponse(res, 400, err);
                }
                else {
                  // console.log(location);
                  var tt = {status:"success"};
                  sendJSONresponse(res, 200, tt);
                }
              });
          });
      });
      }
    }
  });
  // console.log("num is "+num);
}

module.exports.profileEdit = function(req, res, next){
  var roll = req.body.roll.trim();
  var ename = req.body.name.trim();
  var ebranch = req.body.branch.trim();
  var eemail = req.body.email.trim();
  var emobile = req.body.mob.trim();
  var password = req.body.pass1.trim();
  var epicname = req.body.picname.trim();
  if(password.length)
  {
  // console.log("picname is "+epicname);
  // console.log(roll+" "+ename+" "+ebranch+" "+eemail+" "+emobile+" "+password+" "+epicname);
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.pass1, salt, function(err, hash) {
      register.update({rollno:roll}, {$set:{name:ename,branch:ebranch,email:eemail,mobile:emobile,password:hash,picname:epicname}}, function(error, result){
        if(error)
        {
          // console.log("There is something error in update the profile");
          res.json({status:"There is something error in update the profile"});
        }
        else {
          // console.log(result);
          res.json(result);
        }
      });
    });
});
}
else {
  register.update({rollno:roll}, {$set:{name:ename,branch:ebranch,email:eemail,mobile:emobile,picname:epicname}}, function(error, result){
    if(error)
    {
      // console.log("There is something error in update the profile");
      res.json({status:"There is something error in update the profile"});
    }
    else {
      // console.log(result);
      res.json(result);
    }
  });
}
}

module.exports.login = function(req,res,next){
  // console.log("API Login");
  // console.log(req.body);
  var roll = req.body.roll;
  var pass = req.body.pass;
  register.find().where({rollno:roll}).exec(function(err, resu){
    if(err){
      // console.log("Inside login error");
      sendJSONresponse(res, 400, err);
    }
    else {
      // console.log("Inside login else");
      // console.log("result is "+resu);
      var length = resu.length;
      if(length == 0)
      {
        // console.log("Not registered");
        sendJSONresponse(res, 105, err);
      }
      else {
        bcrypt.compare(pass, resu[0].password, function(err, resul) {
          if(err)
          {
            // console.log("Inside error");
            sendJSONresponse(res, 400, err);
          }
          else
           {
            // console.log(resul);
            if(resul == false)
            {
              // console.log("Password wrong");
              sendJSONresponse(res, 106, err);
            }
            else
            {
                // console.log("Successfull login");
                // console.log("sarthak "+resu[0].rollno);
                // var tt = {"rollno":resu[0].rollno,
                //           "pic":resu[0].picname};
                // console.log(tt);
                // console.log("resu is "+resu);
                res.json(resu);
            }
          }
      });
    }
  }
});
}

module.exports.findSelectData = function(req, res, next){
  // console.log("Inside find select data");
  information.find().distinct('type_one',function(error, resl){
    if(error)
    {
      // console.log("There is some error in finding the documents");
      res.json("There is some error in finding distinct document");
    }
    else {
      // console.log("resl is "+resl);
      // console.log(resl.length);
      res.json(resl);
    }
  });
}

module.exports.findSelectTypesData = function(req, res, next){
  var pa = req.params.xy;
  // console.log("Here name is "+pa);
  information.find().distinct('type_two').where({type_one:pa}).exec(function(err, result){
    if(err)
    {
      // console.log("There is some server error");
      res.json({status:"There is no related documents"});
    }
    else {
      res.json(result);
    }
  });
}

module.exports.findSelectSubTypesData = function(req, res, next){
  var nam = req.params.ab;
  // console.log("Here param name is "+nam);
  information.find().distinct('type_three').where({type_two:nam}).exec(function(err, result){
    if(err)
    {
      // console.log("There is some server error");
      res.json({status:"There is no related documents"});
    }
    else {
      res.json(result);
    }
  });
}

module.exports.showQuestions = function(req, res, next){
  var name = req.params.abc;
  // console.log(name);
  questions_select.find().where({subtype:name}).exec(function(err, result){
    if(err){
      // console.log("No questions available");
      res.json({status:"SORRY !!! There is no questions available for this type"});
    }
    else {
      // console.log("Result return");
      res.json(result);
    }
  });
}

module.exports.myProfile = function(req, res, next){
  var roll = req.params.bcd;
  // console.log(roll);
  register.find().where({rollno:roll}).exec(function(error, result){
    if(error)
    {
      // console.log("There is somthing wromg");
      sendJSONresponse(res, 400, error);
    }
    else {
      user_test_info.find().where({user_rollo:roll}).exec(function(error2, result2){
        if(error2)
        {
          sendJSONresponse(res, 401, error2);
        }
        else {
            var ob = {res1: result, res2:result2};
            res.json(ob);
        }
      });
    }
  });
}

module.exports.editProfile = function(req, res, next){
  var roll = req.params.rolln;
  // console.log("rollno on api controller of edit profile "+roll);
  register.find().where({rollno:roll}).exec(function(err, resl){
    if(err)
    {
      // console.log("There is some error to finding this profile");
      res.json(err);
    }
    else {
      res.json(resl);
    }
  });
}

module.exports.showTestId = function(req, res, next){
  var subtp = req.params.sub;
  new_test_id.find().where({subtype:subtp}).exec(function(error, result){
    if(error)
    {
      res.json({Status:'there is some error in finding this type of test'});
    }
    else {
      // console.log("result in api side "+result);
      res.json(result);
    }
  })
}

module.exports.testQuestions = function(req, res, next){
  var testid = req.params.testq;
  var rollno = req.params.roll;
  user_test_info.find().where({user_rollo:rollno}).exec(function(error1, result1){
    if(error1)
    {
      // res.json({Status:"There is some server issue"});
      sendJSONresponse(res, 400, error1);
    }
    else {
      if(result1.length == 0)
      {
        user_test_info.create({
          user_rollo: rollno,
          test_id: testid,
          getMarks: '0',
          maxMarks: '20',
          date: Date.now(),
          test_given: '1'
        }, function(error2, result2){
          if(error2)
          {
            // res.json({Status:"There is some error in adding current date ! Server side error"});
            sendJSONresponse(res, 401, error2);
          }
          else {
            // console.log(result2);
            test_info.find().where({test_id:testid}).exec(function(err, resl){
              if(err)
              {
                // res.json({Status:"Error to find the time !!! Server side error"});
                sendJSONresponse(res, 402, err);
              }
              else {
                test_q_info.find().where({test_id:testid}).exec(function(error, result){
                  if(error)
                  {
                    // res.json({Status:"Error to find the questions of this test !!! Server side error"});
                    sendJSONresponse(res, 403, error);
                  }
                  else {
                    var ob = {time:resl, qarr: result};
                    // console.log(ob);
                    // console.log("API side result is "+ob);
                    res.json(ob);
                  }
                })
              }
            });
          }
        });
      }
      else {
        // console.log("You have already given that test");
        // res.json({Status:"You have already given that test"});
        sendJSONresponse(res, 106, error1);
      }
    }
  });
  // console.log("hete test is "+testid);
  // res.json({Status:"Success"});
}

module.exports.showResult = function(req, res, next){
  // console.log("Inside api controller");
  var rollno = req.body.rollno;
  var testId = req.body.test;
  // console.log(req.body.obj);
  // console.log(req.body.obj.answer1);
  var result = 0;
  var qNo="";
  var ans = "";
  // console.log(rollno+" "+testId);
  test_info.find().where({test_id:testId}).exec(function(error1, result1){
    // console.log("Here");
    // console.log(result1[0].No_of_q+" "+result1[0].max_marks);
    var noQ = result1[0].No_of_q;
    if(error1)
    {
      // console.log("API side problem in finding testid");
      sendJSONresponse(res, 400, error1);
    }
    else {
      test_q_info.find().where({test_id:testId}).exec(function(error2, result2){
        if(error2)
        {
          // console.log("Error in finding data about test");
          sendJSONresponse(res, 401, error2);
        }
        else {
          for(var i=1 ; i<=noQ ; i++)
          {
            ans = "answer"+i;
            var anssel = req.body.obj[ans];
            var rightans = result2[i-1].right;
            if(anssel == rightans)
            {
              result = result + parseInt(result2[i-1].marks);
            }
            else {
              result = result+0;
            }
          }
          var resl = result.toString();
          user_test_info.update({user_rollo:rollno,test_id:testId}, {$set:{getMarks:resl}}, function(error3, result3){
                if(error3)
                {
                  // console.log("There is some error in inserting the result");
                  sendJSONresponse(res, 401, error3);
                }
                else {
                  user_test_info.find({test_id:testId}).sort({"getMarks":-1}).exec(function(error4, result4){
                    if(error4)
                    {
                      // console.log("Error in sorting");
                      sendJSONresponse(res, 405, error4);
                    }
                    else {
                      console.log(result4);
                      var ob = {res2: result2, res4:result4};
                      res.json(ob);
                    }
                  });
                }
          });
        }
      });
  }
});
}

module.exports.instructions = function(req, res, next){
  var testid = req.body.test;
  test_info.find().where({test_id:testid}).exec(function(error, result){
    if(error)
    {
      sendJSONresponse(res, 405, error);
    }
    else {
      res.json(result);
    }
  });
}

module.exports.viewRankings = function(req, res, next){
  var roll = req.body.rollno;
  var testid = req.body.test;
  user_test_info.find({test_id:testid}).sort({"getMarks":-1}).exec(function(error1,result1){
    if(error1)
    {
      sendJSONresponse(res, 405, error4);
    }
    else {
      res.json(result1);
    }
  });
}
