const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        const decode = jwt.verify(req.headers.authorization.split(" ")[1], "rizwan");
        req.userData = decode;
        next();
    }
    catch (error){
        res.status(500).json({
            Message : "Auth Error"
        });
    }
};