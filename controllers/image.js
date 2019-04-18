const Clarifai = require('clarifai');

// Clarifai api key
const app = new Clarifai.App({
  apiKey: 'c9f37abd2a2d4fabbb8f6aac827dbd41'
});

const handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data)
  })
  .catch(err => res.status(400).json("unable to work with api"))
}

const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => res.json(entries[0]))
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {handleImage, handleApiCall};