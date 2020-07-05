const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header('auth-token')
    if (!token){
        console.log(token);
        res.status(400).send('Access Denied')
        return
    }

    try {
        const check = jwt.verify(token, 'tumo_students')
        req.user = check.id
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}