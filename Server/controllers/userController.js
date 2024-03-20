const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
exports.AddUser = async(req, res) => {
  const {   Mail } = req.body;
      // test email
      User.findOne({ Mail }).then ( async (findUser)  => {
        if(findUser === null)
        {
          const newUser = await new User({ ...req.body });
        // hashage password
          const Password = await bcrypt.hash(req.body.Password, saltRounds);
          newUser.Password = Password;
          newUser.IsValid = true;
          newUser.LastConnexion = Date.now();
          newUser.isGoogleAuth = false;
        // then we save user in DB
          newUser.save().then(() => {
            res.status(200).send({status : "200"});
          }).catch((error) => {
            console.log(error)
            res.status(401).send({ status : "401", errors: [{ msg: error }] });
          })
        }
        else {
          res.status(401).send({ errors: [{ msg: 'email should be unique' , user:  findUser}] });
        }
        
      }).catch ( (error) => 
     {
      console.log(error)
      res.status(400).send({ errors: [{ msg: 'error' , error:  error}] });
      })
}

exports.Register = async (req, res) => {
      const {   Mail, Password } = req.body;
      // test email
      const findUser = await User.findOne({ Mail });
      // email should be unique
      if (findUser) {
        return res.status(400).send({ errors: [{ msg: 'email should be unique' }] });
      }
      // new user
      const newUser = await new User({ ...req.body });
      // hashage password
     
      newUser.Password = await bcrypt.hash(Password, saltRounds);
      newUser.IsValid = false;
      newUser.LastConnexion = Date.now();
      newUser.isAdmin = false;
      newUser.isGoogleAuth = false;
      // then we save user in DB
      newUser.save().then(()  => {
        const Token = jwt.sign(
          {
            id: newUser._id
          },
          process.env.SECRET_KEY,
          { expiresIn: '3h' }
        );
        // response
        res.status(200).send({ status : "200", token: Token});
      }).catch((error) => {
        res.status(401).send({ errors: { msg: error } });
        console.log(error);
      })

  };
exports.GetUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).send({ status : "200", Users});
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.GetUser =  async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).send({ msg : 'user' , user});
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.GetPopular = async (req, res) => {
  try {
    const popular = await User.aggregate([
      {
        $lookup: {
          from: 'Post',
          localField: 'Posts',
          foreignField: '_id',
          as: 'userPosts'
        }
      },
      {
        $group: {
          _id: '$_id',
          user: { $first: '$$ROOT' }, // Preserve the entire user document
          TotalViews: { $sum: { $size: '$userPosts.Views' } }, // Calculate the sum of views
          
        },
      },
      {
        $sort: { TotalViews: -1 }, // Sort by TotalViews in descending order
      },
    ]);
    res.status(200).send({ status: 200, popular });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.DeleteUser = async (req,res) => {
  console.log("7chineh")
  try {
    await User.deleteOne({_id: req.params.id });
    res.status(200).send({status : "200", msg : 'User deleted'});
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.UpdateUser = async (req,res) => {
  try {
    await User.updateOne({ _id: req.params.id }, { $set: { ...req.body } }); 
    
      res.status(200).send({msg : 'User updated'});
    
  }catch(error)
  {
    res.status(400).send({ errors: [{ msg: error }] });
  }
}
exports.ValidateUser = async (req,res) => {
  User.findById(req.params.id).then((result) => {
    console.log(result)
    console.log(req.body)
      result.Preferences = result.Preferences.concat(req.body.map(String));
      result.IsValid = true;
      result.save().then(() => {
        res.status(200).send({msg : 'User updated' , status:"200"})
      }).catch(() => {
        res.status(401).send({errors: [{msg : 'couldn t update user', status:"401"}]})
      })
  }).catch((err) => {
    console.log(err)
    res.status(400).send({errors: {msg : 'User not found'}})
  })
}

exports.Login = async(req,res) => {
  
  if (req.body.LoginByGoogle == false)
   {  //Saisie email et password 
      const {Mail , Password} = req.body;
      //recherche user 
      User.findOne({Mail}).then((findUser) => {
        bcrypt.compare(Password, findUser.Password).then((comparepassword) => 
        {
          if(!comparepassword) 
          {
            res.status(401  ).send({status: "401", msg : 'Bad credentials'});
          }else 
          {
            const token = jwt.sign({id: findUser._id},process.env.SECRET_KEY, {expiresIn : '3h'});
            res.status(200).send({status:"200",user: findUser,token});
          }
        })
      }).catch(() => {
        res.status(401).send({msg : 'Bad credentials', status:"401"});
      })} 
  else 
  {
    const Mail  = req.body.Mail;
    User.findOne({Mail}).then((findUser) => {
      if (!findUser)
      {
        const newUser =  new User({ ...req.body });
        // hashage password
        newUser.IsValid = false;
        newUser.LastConnexion = Date.now();
        newUser.isAdmin = false;
        newUser.isGoogleAuth = true;
        // then we save user in DB
        newUser.save().then((result) => {
            // CRRE UN TOKEN
          const Token = jwt.sign(
            {
              id: newUser._id
            },
            process.env.SECRET_KEY,
            { expiresIn: '3h' }
          );
          // response
          res.status(200).send({ status : "200", user: result, token: Token});
        }).catch((error) => {
          res.status(402).send({ status : "402", msg: error });
        })

      }else {
        const token = jwt.sign(
          {id: findUser._id},
          process.env.SECRET_KEY, 
          {expiresIn : '3h'}
        );
        res.status(200).send(
        {
          status:"200",
          user: findUser,
          token
        });
      }
    })

  }
  
}


