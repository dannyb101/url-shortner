const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/connect");
const router = require("./router");
var bodyParser = require("body-parser");

const db_uri = process.env.URL_SHORTNER_MONGO_URL;
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.use("/api/shorturl", router);

const start = async () => {
	try {
		await connectDB(db_uri);
		app.listen(PORT, console.log(`Listening on port ${PORT} ...`));
	} catch (error) {
		console.log(error);
	}
};

start();

// allow a user to post a URL
// if the URL already exisits in the db then return its location in the db
// if not add it to the db and return the location
// if a user enters a value for an entry return the website, otherwise return an error

// also need error handling for when an invalid url is entered - "No short URL found for the given input"
