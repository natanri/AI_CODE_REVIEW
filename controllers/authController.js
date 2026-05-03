const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/User");


//Register
exports.register = async(req, res) => {
  const {email, password} = req.body;
  
  try{
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword
  });
  
  res.redirect("/login");

  } catch (error){
    if(error.code === 11000){
      return res.redirect(`/login?error=exists&email=${encodeURIComponent(email)}`);
    }

    return res.redirect("/register?error=server");    
  }
  
};

//Login form
exports.loginForm = async(req, res) => {
  const { error, email } = req.query;  

  let message = "";

  if (error === "exists"){
    message = "This email is already registered.Please log in."
  }

  res.render("login", {
    error:message, 
    email: email || ''
  });

};

//LOGIN
exports.login = async (req,res) =>{
  const { email, password } = req.body;
  const user = await User.findOne({email});

  if(!user) {
    return res.render("login",{
      error:"User does not exist",
      email
    });
  }
  const valid = await bcrypt.compare(password, user.password);

  if(!valid) {
    return res.render("login", {
      error:"Incorrect password",
      email
    });
  }

  // Create Token
  const token = jwt.sign(
    { id: user._id, email: user.email},
    process.env.JWT_SECRET,
    { expiresIn: "1h"}
  );

  //Save cookie
  res.cookie("token", token, {
    httpOnly: true
  });

  res.redirect("/");
};

//Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};