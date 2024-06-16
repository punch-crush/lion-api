export default () => ({
	port: parseInt(process.env.PORT, 10) || 8080,
	database: {
		host: process.env.DB_URL + process.env.DB_DATABASE,
	},
	jwt: {
		secretKey: process.env.JWT_SECRET,
	},
});
