// make a connection to the database and store the urls in the db
const mongoose = require("mongoose");

const connectDB = (url) => {
	return mongoose.connect(url);
};

module.exports = connectDB;
