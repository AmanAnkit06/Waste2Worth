const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");
const donorRoutes = require("./routes/donor");
const recepientRoutes = require("./routes/recepient");
const contactUsRoutes = require("./routes/contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

// Setting Up Port Number
const PORT = 4000;

// Loading Environment Variables From .env File
dotenv.config();

// Connecting To Database
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp",
	})
)

//Cloudinary Connect
cloudinaryConnect();

// Setting Up Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/donor", donorRoutes);
app.use("/api/v1/recepient", recepientRoutes);
app.use("/api/v1/reach", contactUsRoutes);

// Testing The Server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Server Is Up And Running ...",
	});
});

// Listening To The Server
app.listen(PORT, () => {
	console.log(`App Is Listening At ${PORT}`);
});
