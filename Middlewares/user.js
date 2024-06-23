const { User } = require("../db")
const { jwtSecret } = require("../config")
function userAuthMiddleware(req,res,next){
    const token = req.headers.authorization
    const word = token.split(" ");
    const jwtToken = word[1];
    const decode = jwt.verify(jwtToken,jwtSecret)
    if(decode.username){
        req.username = decode.username;
        next();
    } else {
        res.status(403).json({
            msg : " You are Not Authenticated"
        })
    }
}

module.exports = userAuthMiddleware;