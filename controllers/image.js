const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.CLARIFAI_API
});

const handleApiCall = (req,res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to work with the API'))
} 

const handleImage = (req,res,postgresDB) => {
	const {id} = req.body;
	postgresDB('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries =>{
	  	res.json(entries[0]);
	  })
	  .catch(err => res.status(400).json('Unable to get entries !'))
}

module.exports = {
	handleImage,
	handleApiCall
}