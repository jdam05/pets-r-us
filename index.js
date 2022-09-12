/**
 * Title: index.js
 * Date: September 10, 2022
 * Author: Jamal Eddine Damir
 * Description: This file contains the setup to route and render files for
 * 				Pets-R-Us Website.
 * Sources:
 * Source code from class GitHub Repository
 * W3Schools.com
 * Instructor provided assignment specific instructions
 */

// Requiring Modules
const express = require("express");
const path = require("path");

// Initializing express app
const app = express();

// Setting template engine to EJS for HTML
app.engine(".html", require("ejs").__express);

// View engine middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// Static middleware for public folder
app.use(express.static(path.join(__dirname, "public")));

// Setting listening prot
const PORT = process.env.PORT || 3000;

// Rendering index.html
app.get("/", (req, res) => {
	res.render("index", {
		title: "Pets-R-Us: Home",
		message: "Welcome to the Pets-R-Us Home Page!",
	});
});

// Rendering grooming.html
app.get("/grooming", (req, res) => {
	res.render("grooming", {
		title: "Pets-R-Us: Grooming",
		message: "Welcome to the pets-R-Us Grooming Page",
	});
});

// Console logging what port is listening
app.listen(PORT, () => {
	console.log("Application started and listening on PORT " + PORT);
});
