const cloudinary = require("cloudinary").v2; //Cloudinary Is Being Required

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			//Configuring The Cloudinary To Upload Media
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
	} catch (error) {
		console.log(error);
	}
};