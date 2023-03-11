const Url = require("./db/model");
const dns = require("dns");

const lookupDNS = (url) => {
	const hostname = new URL(url).hostname;
	return new Promise((resolve, reject) => {
		dns.lookup(hostname, (err, address, family) => {
			if (err) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
};

const validateUrl = async (url) => {
	const re = new RegExp(`^https?:\/\/.*`);
	if (!url.match(re)) {
		return false;
	}
	const valid = await lookupDNS(url);
	return valid;
};

const createShortUrl = async (req, res, next) => {
	const url = req.body.url;
	let site;
	if (!(await validateUrl(url))) {
		res.json({ error: "Invalid URL" });
		return;
	}
	try {
		site = await Url.findOne({ url: url });
		if (!site) {
			const index = await Url.estimatedDocumentCount();
			await Url.create({ url: url, index: index + 1 });
			site = await Url.findOne({ url: url });
		}
	} catch (error) {
		next(error);
	}
	res.json({ original_url: site.url, short_url: site.index });
};

const getShortUrl = async (req, res, next) => {
	try {
		const index = req.params.index;
		const site = await Url.findOne({ index: index });
		const url = site.url;
		res.redirect(url);
	} catch (error) {
		console.log(error);
		next(error);
	}
};

module.exports = { createShortUrl, getShortUrl };
