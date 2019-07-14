const handleRegister = (req, res, postgresDB, bcrypt) => {
	const {email,name,password} = req.body;
	if(!email || !name || !password){
		return res.status(400).json(`there's an empty field`);
	}
	const hash = bcrypt.hashSync(password);
	postgresDB.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginemail => {
			return trx('users')
				.returning('*')
				.insert({
				email: loginemail[0],
				name: name,
				joined: new Date()
				})
				.then(user => {
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})	
	.catch(err => res.status(400).json('Registration failed !'))
}

module.exports = {
	handleRegister: handleRegister
}