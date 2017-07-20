var mongoose = require('mongoose');
var request = require('request');

var register = mongoose.model('user_register');

var sess;
var numb = 0;

module.exports.front = function(req, res, next) {
  res.render('index1', { title: 'Express' });
}

module.exports.register = function(req,res,next){
  res.render('register',{title:'register'});
}

module.exports.registration = function(req, res, next){
  console.log("here");
    // console.log("Or "+req.body.img);
  console.log("pic name is "+req.files.img);
  var image = req.files.img;
  if(image == undefined)
   {
    // console.log("If image ni hai");
    req.body.picname = "";
    var requestOptions = {
      url:'http://localhost:4000/api/register',
      method:"POST",
      json:req.body
    }
    request(requestOptions, function(error, response, body){
      // console.log("Here web server controller");
      // console.log(body);
      if(error)
      {
        console.log("There is some error");
      }
      if (!error && response.statusCode == 200)
      {
        if(body.status == "success")
        {
          // console.log("Success returned");
          // res.json({status:"successful register"});
          res.redirect('/users/login');
        }
      }
      if(response.statusCode == 375)
      {
        // console.log("Inside status code 375");
        res.json({Status:"User already registered"});
      }
    });
  }
  else
  {
    // console.log("if image hai");
  var pn = req.files.img.name;
  var pic = req.files.img;
  // console.log("pn and pic are "+pn+" pic "+pic);
  pic.mv('public/uploads/'+pn, function(err){
    if(err){
      return res.status(500).send(err);
    }
    else {
      req.body.picname = pn;
      var requestOptions = {
        url:'http://localhost:4000/api/register',
        method:"POST",
        json:req.body
      }
      request(requestOptions, function(error, response, body){
        // console.log("Here web server controller");
        // console.log(body);
        if(error)
        {
          console.log("There is some error");
        }
        if (!error && response.statusCode == 200)
        {
          if(body.status == "success")
          {
            // console.log("Success returned");
            // res.json({status:"successful register"});
            res.redirect('/users/login');
          }
        }
        if(response.statusCode == 375)
        {
          // console.log("Inside status code 375");
          res.json({Status:"User already registered"});
        }
      });
    }
  });
}
}

module.exports.profileEdit = function(req, res, next){
  sess = req.session;
  var roll = sess.rollno;
  var imgh = sess.picname;
  console.log("old image is "+imgh);
  // console.log("pic name is "+req.files.img.name.length);
  var pic = req.files.img;
  if(pic == undefined)
  {
    console.log("here undefined");
    req.body.picname = imgh;
    var requestOptions = {
      url:'http://localhost:4000/api/profileEdit',
      method:"POST",
      json:req.body
    }
    request(requestOptions, function(error, response, body){
      // console.log("Here web server controller edit profile");
      // console.log("body is "+body);
      if(error)
      {
        console.log("There is some error");
      }
      else
      {
          // console.log("Success returned");
          // res.json({status:"successful Edit your profile"});
          res.redirect('/myProfile');
      }
    });
  }
  else {
  var pn = req.files.img.name;
  pic.mv('public/uploads/'+pn, function(err){
    if(err){
      return res.status(500).send(err);
    }
    else {
      // console.log("Inside profile edit else web server");
      req.body.picname = pn;
      var requestOptions = {
        url:'http://localhost:4000/api/profileEdit',
        method:"POST",
        json:req.body
      }
      request(requestOptions, function(error, response, body){
        // console.log("Here web server controller edit profile");
        // console.log("body is "+body);
        if(error)
        {
          console.log("There is some error");
        }
        else
        {
            // console.log("Success returned");
            // res.json({status:"successful Edit your profile"});
            res.redirect('/myProfile');
        }
      });
    }
  });
}
}

module.exports.login = function(req, res, next){
  sess = req.session;
  if(sess.rollno)
  {
    // console.log("Session already exist");
    var tt = {pp: [{rollno:sess.rollno, picname:sess.picname}]};
    res.render('after_login',tt)
  }
  else {
    // console.log("Here inside sarthak agarwal");
      res.render('login',{title:"Login page"});
  }
}

module.exports.chklogin = function(req, res, next){
  sess = req.session;
  // console.log("Inside web server login");
  var roll = req.body.roll;
  var requestOptions = {
    url: 'http://localhost:4000/api/login',
    method: 'POST',
    json: {
      roll: req.body.roll,
      pass : req.body.pass
    }
  }
  request(requestOptions,function(err, response, body){
    // console.log("Inside request login");
    // console.log("body is "+body+" this");
    if(err){
          return res.status(500).send(error);
    }
    else
    {
        // console.log("Success returned");
        // console.log("Body is "+body);
        if(response.statusCode == 400)
        {
          // console.log("Inside 400");
          res.json({Status:"Server error"});
        }
        else if(response.statusCode == 106)
        {
          // console.log("Inside 106");
          res.json({Status:"Input right password"});
        }
        else if(response.statusCode == 105)
        {
          // console.log("Inside 105");
          res.json({Status:"This rollno is not registered"});
        }
        else {
          // console.log(body[0].picname);
          sess.rollno = body[0].rollno;
          sess.picname = body[0].picname;
          // console.log(sess.rollno+" "+sess.picname+" "+"Session created");
          var tt = {pp: [{rollno:body[0].rollno, picname:body[0].picname}]};
          res.render('after_login',tt);
        }
    }
  });
}

module.exports.after_login = function(req, res, next){
  var s = req.session;
  // console.log("Inside after login"+s.rollno);
  res.render('after_login',{});
}

module.exports.after_practice = function(req, res, next){
  // console.log("Inside after practice");
  numb = 0;
  var requestOptions = {
    url:'http://localhost:4000/api/findSelectData',
    method:'GET'
  }
  request(requestOptions, function(error, response, body){
    // console.log("Result returned");
    if(error)
    {
      return res.status(500).send(error);
    }
    else {
      // console.log("Inside else with result");
      sess = req.session;
      var roll = sess.rollno;
      var img = sess.picname;
      // console.log(roll+" "+img);
      // console.log("Inside success side");
      // console.log("body is "+body);
      var ob = JSON.parse(body);
      var tt = {pp:ob, ss:[roll,img]};
      // console.log(tt.pp[0]);
      // console.log(tt);
      res.render('after_practice',tt);
    }
  });
  // res.render('after_practice',{title:"After select practice page"});
}

module.exports.select_types = function(req, res, next){
  // console.log("Inside select types");
  var sename = req.params.xyz;
  // console.log(sename);
  var requestOptions = {
    url:'http://localhost:4000/api/findSelectTypesData/'+sename,
    method:'GET'
  }
  request(requestOptions, function(error, response, body){
    if(error)
    {
      return res.status(500).send(error);
    }
    else {
      sess = req.session;
      var roll = sess.rollno;
      var img = sess.picname;
      var ob = JSON.parse(body);
      var tt = {pp:ob, ss:[roll,img], pq:sename};
      // console.log(tt);
      res.render('select_type',tt);
    }
  });
}

module.exports.select_subtypes = function(req, res, next){
  var supername = req.params.ab;
  // console.log(supername);
  var sname = req.params.abc;
  // console.log(sname);
  var requestOptions = {
    url:'http://localhost:4000/api/findSelectSubTypesData/'+sname,
    method:'GET'
  }
  request(requestOptions, function(error, response, body){
    if(error)
    {
      return res.status(500).send(error);
    }
    else {
      sess = req.session;
      var roll = sess.rollno;
      var img = sess.picname;
      var ob = JSON.parse(body);
      var tt = {pp:ob, ss:[roll,img], pq:[supername,sname]};
      // console.log(tt);
      res.render('select_subtype',tt);
    }
  });
}

module.exports.showQuestions = function(req, res, next){
  if(numb == 0)
  {
  var supertype = req.params.pqr;
  var tpe = req.params.stu;
  // console.log(supertype+" "+tpe);
  // console.log("Inside show questions");
  var subtype = req.params.xyz;
  // console.log("Subtype is "+subtype);
  var requestOptions = {
    url: 'http://localhost:4000/api/showQuestions/'+subtype,
    method: 'GET'
  }
  request(requestOptions, function(error, response, body){
    if(error){
      return res.status(500).send(error);
    }
    else {
      sess = req.session;
      var roll = sess.rollno;
      var img = sess.picname;
      var ob = JSON.parse(body);
      // console.log(ob);
      var tt = {pp:ob, ss:[roll,img], pq:[supertype,tpe,subtype]};
      // console.log(tt);
      res.render('select_showques',tt);
    }
  });
}
else {
  var supertype = req.params.pqr;
  var tpe = req.params.stu;
  var subtype = req.params.xyz;
  requestOptions = {
    url:'http://localhost:4000/api/showTestId/'+subtype,
    method:'GET'
  }
  request(requestOptions, function(error, response, body){
    if(error)
    {
      return res.status(500).send(error);
    }
    else {
      // console.log("result in web server side "+body);
      sess = req.session;
      var roll = sess.rollno;
      var img = sess.picname;
      var ob = JSON.parse(body);
      var tt = {pp:ob, ss:[roll,img], pq:[supertype,tpe,subtype]};
      res.render('select_testId',tt);
      // res.json({Status:"success"});
    }
  })
}
}

module.exports.after_select_test = function(req, res, next){
  // res.render('after_test',{title:"After select test page"});
  numb = 1;
  console.log("Inside here");
  var requestOptions = {
    url:'http://localhost:4000/api/findSelectData',
    method:'GET'
  }
  request(requestOptions, function(error, response, body){
    // console.log("Result returned");
    if(error)
    {
      return res.status(500).send(error);
    }
    else {
      // console.log("Inside else with result");
      sess = req.session;
      var roll = sess.rollno;
      var img = sess.picname;
      // console.log(roll+" "+img);
      // console.log("Inside success side");
      // console.log("body is "+body);
      var ob = JSON.parse(body);
      var tt = {pp:ob, ss:[roll,img]};
      // console.log(tt.pp[0]);
      // console.log(tt);
      res.render('after_test',tt);
    }
  });
}

module.exports.myProfile = function(req, res, next){
  sess = req.session;
  var roll = sess.rollno;
  var img = sess.picname;
  requestOptions = {
    url: 'http://localhost:4000/api/myProfile/'+roll,
    method: 'GET'
  }
  request(requestOptions, function(error, response, body){
    if(error)
    {
      // console.log("There is some error to find the data of this user");
      return res.status(500).send(error);
    }
    else {
      var count = 0;
      if(response.statusCode == 400)
      {
        count++;
        res.json({Status:"Server error in finding your profile"});
      }
      if(response.statusCode == 401)
      {
        count++;
        res.json({Status:"Server error test information"});
      }
      if(count == 0)
      {
        // console.log(body);
        var ob = JSON.parse(body);
        console.log(ob);
        var tt = {pp:ob};
        console.log(tt.pp.res1);
        console.log();
        console.log(tt.pp.res2);
        console.log(tt.pp.res1[0].rollno);
        console.log();
        // res.json({Status:"SUCCESS"});
        res.render('profile',tt);
      }
    }
  });
}

module.exports.editProfile = function(req, res, next){
  sess = req.session;
  var roll = sess.rollno;
  // console.log("rollno is in edit profile on webserver "+roll);
  requestOptions = {
    url: 'http://localhost:4000/api/editProfile/'+roll,
    method: 'GET'
  }
  request(requestOptions, function(error, response, body){
    // console.log("Here return");
    if(error)
    {
      // console.log("There is some error in finding this profile");
      res.json({status:"There is some error in finding this profile"});
    }
    else {
      // console.log(body);
      var ob = JSON.parse(body);
      // console.log(ob);
      var tt = {pp:ob};
      // console.log(tt.pp[0].rollno);
      res.render('editProfile',tt);
      // res.json({Status:"SUCCESS"});
    }
  });
}

module.exports.logout = function(req, res, next){
  // console.log("we are inside logout");
  req.session.destroy(function(err){
    if(err)
    {
      // console.log(err);
      res.json({Status:"Error in logout"});
    }
    else {
      res.redirect('/users/login');
    }
  });
}

var testid = "";

module.exports.instructions = function(req, res, next)
{
  sess = req.session;
  var roll = sess.rollno;
  var img = sess.picname;
  testid = req.params.testId;
  requestOptions = {
    url: 'http://localhost:4000/api/instructions',
    method:"POST",
    json:{
      test: testid
    }
  }
  request(requestOptions, function(error, response, body){
    if(error)
    {
      res.json({Status:"Server error in finding instructions"});
    }
    else {
      if(response.statusCode == 405)
      {
        res.json({Status:"Server error in finding instructions"});
      }
      else {
        console.log(body);
        // var ob = JSON.parse(body);
        var tt = {pp:body, rollno:roll, pic:img};
        console.log(tt);
        res.render('instruction',tt);
      }
    }
  });
}

module.exports.after_start_test = function(req, res, next){
  // console.log("Here testis is "+testid);
  sess = req.session;
  var roll = sess.rollno;
  var img = sess.picname;
  // console.log(roll+" "+img);
  requestOptions = {
    url: 'http://localhost:4000/api/testQuestions/'+testid+'/'+roll,
    method: 'GET'
  }
  request(requestOptions, function(error, response, body){
    // console.log("Here inside after start test");
    if(error)
    {
      res.json({Status:"There is some error to finding the questions of this type"});
    }
    else {
      if(response.statusCode == 400)
      {
        res.json({Status:"Server error"});
      }
      else if(response.statusCode == 401)
      {
        res.json({Status:"There is some error in adding current date ! Server side error"});
      }
      else if(response.statusCode == 402)
      {
        res.json({Status:"Error to find the time !!! Server side error"});
      }
      else if(response.statusCode == 403)
      {
        res.json({Status:"Error to find the questions of this test !!! Server side error"});
      }
      else if(response.statusCode == 106)
      {
        res.json({Status: "You have already attempted this test"});
      }
      else {
        var ob = JSON.parse(body);
        var tt = {pp:ob,test:testid};
        // console.log(tt.test);
        // console.log(tt.pp.time[0].time);
        // console.log(tt.pp.qarr.length);
        // console.log(tt.pp.qarr[0]);
        res.render('show_test',tt);
      }
    }
  });
}

module.exports.show_result = function(req, res, next){
  sess = req.session;
  var roll = sess.rollno;
  var img = sess.picname;
  // console.log(roll+" "+img+" "+testid);
  requestOptions = {
    url:'http://localhost:4000/api/showResult',
    method:'POST',
    json:{
      test:testid,
      rollno:roll,
      obj: req.body
    }
  }
  request(requestOptions, function(error, response, body){
    if(error)
    {
      // console.log("Error in result");
      res.json({Status:"There is some error in finding result"});
    }
    else {
      console.log("Success in result");
      // console.log(body);
      var len = body.res4.length;
      var count = 1;
      var marks = 0;
      console.log("res4 before sort "+body.res4);
      body.res4.sort();
      console.log("Res4 after sort "+body.res4);
      for(var i=0 ; i<len ; i++)
      {
        console.log("Here");
        if(body.res4[i].user_rollo != roll)
        {
          count++;
        }
        else {
          marks = body.res4[i].getMarks;
          break;
        }
      }
      if(response.statusCode == 400)
      {
        // console.log("Server side problem in finding testid");
        res.json({Status:"Server side problem in finding testid"});
      }
      else if(response.statusCode == 401)
      {
        // console.log("Error in finding data about test");
        res.json({Status:"Server Error in finding data about test"});
      }
      else if(response.statusCode == 402)
      {
        // console.log("There is some error in inserting the result");
        res.json({Status:"Server error in inserting the result"});
      }
      else if (response.statusCode == 405)
      {
        // console.log("Error in sorting");
        res.json({Status:"Server side Error in sorting"});
      }
      else {
        // console.log("Rank is "+count);
        var tt = {pp:body, size:len, rank:count, rollno:roll, picname:img, mark: marks};
        // console.log(tt);
        // console.log();
        // console.log(tt.pp);
        // res.json({Status:"Success"});
        res.render('show_result', tt);
      }
    }
  });
}

module.exports.viewRankings = function(req, res, next){
  sess = req.session;
  var roll = sess.rollno;
  var img = sess.picname;
  var testid = req.params.abcd;
  requestOptions = {
    url:'http://localhost:4000/api/viewRankings',
    method:"POST",
    json:{
      rollno:roll,
      test:testid
    }
  }
  request(requestOptions, function(error, response, body){
    if(error){
      res.json({Status:"Error in sending the data"});
    }
    else {
      // var tt = {pp:body, size:len, rank:count, rollno:roll, picname:img, mark: marks};
      var len = body.length;
            // console.log(body);
            var count = 1;
            var getmarks=0;
            var date = 0;
      for(var i=0 ; i<len ; i++)
      {
        if(body[i].user_rollo != roll)
        {
          count++;
        }
        else {
          getmarks = body[i].getMarks;
          // date = body[i].date;
          break;
        }
      }
      var tt = {pp:body, rank:count, rollno:roll, picname:img, marks:getmarks};
      console.log(tt);
      // res.json(tt);
      // res.json({Status:"SUCCESS"});
      res.render('rankings',tt);
    }
  });
}
