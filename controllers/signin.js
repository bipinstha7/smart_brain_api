const handleSignin = (req, res, db, bcrypt) => {
  const {email,password} = req.body;
   //validation
  if(!email || !password) {
    return res.status(400).json('email/password incorrect');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash)
      if (isValid) {
        return db.select('*').from('users')
        .where('email', '=', email)
        .then(user => res.json(user[0]))
        .catch(err => res.status(400).json('unable to get user'))
      } else {
        return res.status(400).json('wrong credentials')
      } 
    })
    .catch(err => res.status(400).json('wrong credentials'));
}


// module.exports = { handleSignin: handleSignin };

// es6 destruturing
module.exports = { handleSignin };