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

const handleProfileUpdate = (req, res, db) => {
  const {id} = req.params;
  const {name, age, pet} = req.body.formInput;
  db('users')
    .where({id})
    .update({name})
    .then(response => {
      if(response) {
        res.json("update success");
      } else {
        res.status(400).json("unable to update");
      }
    })
    .catch(err => res.status(400).json("error updating user"));
};

module.exports = {
  handleProfile: handleProfile,
  handleProfileUpdate
}; 