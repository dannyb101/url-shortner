// create a mongoose model
// needs to be able to create a url (that fits the url pattern) and the index number
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	url: String,
	index: Number,
});
const Url = mongoose.model("Url", schema);

module.exports = Url;
