/**
 * Title: index.js
 * Date: September 10, 2022
 * Author: Jamal Eddine Damir
 * Description: This file contains the setup to route and render files for
 * 				Pets-R-Us Website.
 * Sources:
 * Source code from class GitHub Repository
 * W3Schools.com
 * Stackabuse.com
 * Instructor provided assignment specific instructions
 */

// Requiring Modules
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");

const Customer = require("./models/customer");
const Appointment = require("./models/appointments");

// Initializing express app
const app = express();

// Setting template engine to EJS for HTML
app.engine(".html", require("ejs").__express);

// View engine middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// Static middleware for public folder
app.use(express.static(path.join(__dirname, "public")));

// middleware express method that recognizes incoming request objects as strings or arrays
app.use(express.urlencoded({ extended: true }));

// middleware express method that recognizes incoming request objects as JSON objects
app.use(express.json());

// Setting listening prot
const PORT = process.env.PORT || 3000;

// Connecting to mongodb database
const CONN =
	"mongodb+srv://web340_admin:h1DAijpoZVOuie69@bellevueuniversity.5vradwb.mongodb.net/web340DB";

// Displaying success or error for database connection
mongoose
	.connect(CONN)
	.then(() => {
		console.log("Connection to MongoDB database was successful!");
	})
	.catch((err) => {
		console.log("MongoDB Error: " + err.message);
	});

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

// Rendering boarding.html
app.get("/boarding", (req, res) => {
	res.render("boarding", {
		title: "Pets-R-Us: Boarding",
		message: "Welcome to the pets-R-Us Boarding Page",
	});
});

// Rendering training.html
app.get("/training", (req, res) => {
	res.render("training", {
		title: "Pets-R-Us: Training",
		message: "Welcome to the pets-R-Us Training Page",
	});
});

// Rendering registration.html
app.get("/registration", (req, res) => {
	res.render("registration", {
		title: "Pets-R-Us: Registration",
		message: "Welcome to the pets-R-Us Registration Page",
	});
});

// Routing customer HTTP POST requests
app.post("/customer", (req, res, next) => {
	console.log(req.body);
	console.log(req.body.customerId);
	console.log(req.body.email);
	const newCustomer = new Customer({
		customerId: req.body.customerId,
		email: req.body.email,
	});

	console.log(newCustomer);

	// Routing to landing page when no error is detected
	Customer.create(newCustomer, function (err, customer) {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.render("index", {
				title: "Pets-R-Us: Home",
			});
		}
	});
});

// Getting customer list from database using the find method
app.get("/customers", (req, res) => {
	Customer.find({}, function (err, customers) {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.render("customers", {
				title: "Pets-R-Us: Customer List",
				customers: customers,
			});
		}
	});
});

// Rendering booking.html
app.get("/booking", (req, res) => {
	fs.readFile("./public/data/services.json", (err, data) => {
		if (err) throw err;
		services = JSON.parse(data);
		res.render("booking", {
			title: "Pets-R-Us: Booking",
			message: "Welcome to the pets-R-Us Appointment Booking Page",
			services: services,
		});
	});
});

// Rendering appointment.html
app.get("/appointment", (req, res, next) => {
	Appointment.find({}, (err, appointment) => {
		if (err) {
			console.log(err);
			next(err);
		} else {
			// send the appointments list to the appointments page
			res.render("appointment", {
				title: "Pets-R-Us My Appointments",
				Message: "Welcome to the pets-R-Us My Appointment Page",
				appointments: appointment,
			});
		}
	});
});

// Routing appointment HTTP POST requests
app.post("/appointments", (req, res, next) => {
	console.log(req.body);
	console.log(req.body.firstName);
	console.log(req.body.lastName);
	console.log(req.body.email);
	console.log(req.body.services);
	const newAppointment = new Appointment({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		services: req.body.services,
	});

	console.log(newAppointment);

	// Routing to landing page when no error is detected
	Appointment.create(newAppointment, function (err, appointment) {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.render("index", {
				title: "Pets-R-Us: Home",
			});
		}
	});
});

// Finding appointment with searched email and returning collection data
app.get("/api/appointments/:email", async (req, res, next) => {
	Appointment.find({ email: req.params.email }, function (err, appointments) {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.json(appointments);
		}
	});
});

// Console logging what port is listening
app.listen(PORT, () => {
	console.log("Application started and listening on PORT " + PORT);
});
