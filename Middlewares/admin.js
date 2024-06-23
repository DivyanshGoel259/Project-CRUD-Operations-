const { Admin } = require("../db")
const { jwtSecret } = require("../config")
function adminAuthMiddleware(req,res,next){
    const token = req.headers.authorization
    const word = token.split(" ");
    const jwtToken = word[1];
    const decode = jwt.verify(jwtToken,jwtSecret)
    if(decode.username){
        next();
    } else {
        res.status(403).json({
            msg : " You are Not Authenticated"
        })
    }
}

module.exports = adminAuthMiddleware;