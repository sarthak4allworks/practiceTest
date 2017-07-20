function validateRegister()
{
  var roll = document.registration.roll.value;
  var name = document.registration.name.value;
  var branch = document.registration.branch.value;
  var email = document.registration.email.value;
  var mobile = document.registration.mob.value;
  var pass = document.registration.pass1.value;
  var repass = document.registration.pass2.value;
  var pic = document.registration.img.value;
  if(roll =='' || roll == null)
  {
    alert("rollno should not be null");
    document.registration.roll.focus();
    return false;
  }
  if(name ==''|| name == null)
  {
    alert("Name is required");
    document.registration.name.focus();
    return false;
  }
  if(email == '' || email == null)
  {
    alert("email is required");
    document.registration.email.focus();
    return false;
  }
  var patt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-z]{2,4})+$/;
  if (!patt.test(email))
  {
    alert("Please provide a valid email address");
    document.registration.email.focus();
    return false;
  }
  if(pass == '' || pass == null)
  {
    alert("password is required");
    document.registration.pass1.focus();
    return false;
  }
  if(pass.length < 6)
  {
    alert("password should be minimum 6 length");
    document.registration.pass1.focus();
    return false;
  }
  if(repass == '' || repass == null)
  {
    alert("password entered again");
    document.registration.pass2.focus();
    return false;
  }
  if(pass != repass)
  {
    alert("password must be same");
    document.registration.pass1.value = "";
    document.registration.pass2.value = "";
    document.registration.pass1.focus();
    return false;
  }

  var patternName = /([a-zA-Z\s]{1,50})/;
  if(!patternName.test(name))
  {
      alert("Valid name is required .");
      document.registration.name.focus();
      return false;
  }
  if(pic == '')
  {
  }
  else {
    var Extension = pic.substring(pic.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg")
    {
    }
    else {
      alert("Image only allows file types of GIF, PNG, JPG, JPEG and BMP. ");
      document.registration.img.focus();
      return false;
    }
  }
}

function validateLogin()
{
  var roll = document.LoginPage.roll.value;
  var pass = document.LoginPage.pass.value;
  if(roll == '' || roll == null)
  {
    alert("Rollno can't be null");
    document.LoginPage.roll.focus();
    return false;
  }
  if(pass == null || pass == '')
  {
    alert("password can't be null");
    document.LoginPage.pass.focus();
    return false;
  }
}

function validateProfile()
{
  var name = document.editProfile.name.value;
  var email = document.editProfile.email.value;
  var pass = document.editProfile.pass1.value;
  var repass = document.editProfile.pass2.value;
  var pic = document.editProfile.img.value;
  if(name ==''|| name == null)
  {
    alert("Name is required");
    document.editProfile.name.focus();
    return false;
  }
  var patternName = /([a-zA-Z\s]{1,50})/;
  if(!patternName.test(name))
  {
      alert("Valid name is required .");
      document.editProfile.name.focus();
      return false;
  }
  if(email == '' || email == null)
  {
    alert("email is required");
    document.editProfile.email.focus();
    return false;
  }
  var patt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-z]{2,4})+$/;
  if (!patt.test(email))
  {
    alert("Please provide a valid email address");
    document.editProfile.email.focus();
    return false;
  }
  if(pass.length < 6)
  {
    alert("password should be minimum 6 length");
    document.editProfile.pass1.focus();
    return false;
  }
  if(pass != repass)
  {
    alert("password must be same");
    document.editProfile.pass1.value = "";
    document.editProfile.pass2.value = "";
    document.editProfile.pass1.focus();
    return false;
  }
  if(pic == '')
  {
  }
  else {
    var Extension = pic.substring(pic.lastIndexOf('.') + 1).toLowerCase();
    if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg")
    {
    }
    else {
      alert("Image only allows file types of GIF, PNG, JPG, JPEG and BMP. ");
      document.editProfile.img.focus();
      return false;
    }
  }
}

function changeColor(value)
{
  var ide = value;
  var color = "#FF0000";
  document.getElementById(ide).style.backgroundColor = color;
}

function ClearPlz(value)
{
  var ide = value;
  // alert(ide);
  var x = document.getElementsByClassName(ide);
  // alert(x.length);
  // alert(x);
  defcolor = document.body.style.backgroundColor;
  var len = x.length;
  document.getElementById(ide).style.backgroundColor = defcolor;
  for(var i=0 ; i<len ; i++)
  {
    console.log(x[i].checked);
    x[i].checked = false;
  }
}
