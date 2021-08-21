const jwt=require("jsonwebtoken");
const User=require("../models/User");
const requireAuth=(req,res,next)=>{
    let token=req.cookies.jwt;
    if(token){
        jwt.verify(token,'vig secret',(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect("/login");
            }else{
              console.log("///////");
                console.log(decodedToken);
                console.log("//////");
                next();
            }
        })
    }else{
        res.redirect("/login")
    }
    
}

const checkUser = (req, res, next) => {
  console.log('hi');
    const token = req.cookies.jwt;
    if (token) {
       console.log('1');
      jwt.verify(token, 'vig secret', async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          console.log(user);
          res.locals.user = user;
          console.log(res.locals);
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };
module.exports={requireAuth,checkUser};