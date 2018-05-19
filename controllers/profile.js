const handleProfile = (req, res) => {
  const {id} = req.params;
  let found = false;
  db.select('*').from('users').where({id: id}).then(user => {
    if(user.length) {
      res.json(user);
    } else {
      res.status(400).json("error getting user");
    }
    
  })
  .catch(err => res.status(400).json('something went wrong'));
}

module.exports = {handleProfile: handleProfile};