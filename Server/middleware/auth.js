const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

exports.IsAuth = async (req,res) => {
    try {
        const token = req.headers.authorization; 
        if (!token) 
        {
            res.status(201).send({msg: 'you are not authorized' , isAuth: false})
        } else 
        {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            // test if the user exist with that id
            const user = await User.findOne({ _id: decoded.id });
            if(!user)
            {
                res.status(202).send({ msg: 'User doesnt exist', isAuth: false });
            } 
            else 
            {
                req.user = user; 
                res.status(200).send({ msg: 'authorized', user: req.user , isAuth: true});
                
            }
        
        }
    }catch (error)
    {
        res.status(403).send({ errors: [{ msg: 'you are not authorized' , isAuth: false}] });
    }
};

