const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.error('Invalid inputs passed in user sign up');
		return next(new HttpError('Invalid inputs passed, please check your data.', 422));
	}

	let { name, username, email, password } = req.body;
  
	let existingUser;
	try {
		existingUser = await User.findOne({ username: username });
	} catch (err) {
		console.error(`Error while checking for existing user in sign up 1 \n${err}`);
		return next(new HttpError('Signing up failed, please try again later.', 500));
	}
  
	if (existingUser) {
		console.error(`User with same username exist can't sign up`);
		return next(new HttpError('username exists already, please login instead.', 422));
  }

  try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		console.error(`Error while checking for existing user in sign up 2 \n${err}`);
		return next(new HttpError('Signing up failed, please try again later.', 500));
	}
  
	if (existingUser) {
		console.error(`User with same email exist can't sign up`);
		return next(new HttpError('email exists already, please login instead.', 422));
  }
    
	let hashedPassword;
	try {
	  	hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		console.error(`Error while hashing password in sign up \n${err}`);
		return next(new HttpError('Could not create user, please try again.', 500));
	}

	const createdUser = new User({
		name,
		username,
		email,
    password: hashedPassword,
    createdAt: Number(new Date())
	});
  
	try {
		await createdUser.save();
	} catch (err) {
		console.error(`Error while saving created user in sign up \n${err}`);
		return next(new HttpError('Signing up failed, please try again later.', 500));
	}
  
	let token;
	try {
		token = jwt.sign({
			userId: createdUser.id,
			email: createdUser.email,
			username: createdUser.username,
			name: createdUser.name,
		}, 'you_did_not_see_that_right#key');
	} catch (err) {
		console.error(`Error while signing token in sign up \n${err}`);
		return next(new HttpError('Signing up failed, please try again later.', 500));
	}

	console.log(`Successfully signed in : ${createdUser.username}`);
  
	res.status(201).json({ 
		...createdUser._doc,
		token: token 
	});
}

const signin = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.error('Invalid inputs passed in mobile user login');
		return next(new HttpError('Invalid inputs passed, please check your data.', 422));
	}
	
	let { email, password } = req.body;
  
	let existingUser;
  
	try {
    existingUser = await User.findOne({ email: email });
	} catch (err) {
		console.error(`Error while checking for existing user in login \n${err}`);
		return next(new HttpError('Logging in failed, please try again later.', 500));
	}
  
	if (!existingUser) {
		console.error(`Can't find user with given email in login`);
		return next(new HttpError('User does not exist, could not log you in.', 403));
	}
  
	let isValidPassword = false;
	try {
	  	isValidPassword = await bcrypt.compare(password, existingUser.password);
	} catch (err) {
		console.error(`Error while comparing hashed password in login \n${err}`);		
		return next(new HttpError('Could not log you in, please check your credentials and try again.', 500));
	}
  
	if (!isValidPassword) {
		console.error(`Invalid password entered for sign in of : ${email}`);
		return next(new HttpError('Invalid credentials, could not log you in.', 403));
	}
  
	let token;
	try {
		token = jwt.sign({
			userId: existingUser.id,
			email: existingUser.email,
			username: existingUser.username,
			name: existingUser.name,
		}, 'you_did_not_see_that_right#key');
	} catch (err) {
		console.error(`Error while signing token in sign in \n${err}`);
		return next(new HttpError('Logging in failed, please try again later.', 500));
	}
  
	console.log(`Successfully logged in : ${existingUser.username}`);

	res.status(200).json({
		...existingUser._doc,
		token: token
	});
}

exports.signup = signup;
exports.signin = signin;