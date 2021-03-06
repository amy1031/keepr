// LOCAL DEV VARIABLES
let env = {
	NODE_ENV: 'production',
	PORT: 3000,
	DBPROTOCOL: 'mongodb',
	DBUSERNAME: 'adminamy',
	DBPASSWORD: 'adminamy',
	DBHOST: 'ds135912.mlab.com:35912',
	DBNAME: 'keeprdb',
	SERVERNAME: 'dev-server'
}

// MAPS env TO ACTUAL ENVIRONMENT
Object.keys(env).forEach(v => {
	process.env[v] = process.env[v] || env[v]
})

// MongoDb Connection String Builder
env.CONNECTIONSTRING = `${env.DBPROTOCOL}://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`
process.env.CONNECTIONSTRING = env.CONNECTIONSTRING

exports = env
