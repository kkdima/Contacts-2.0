import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = props => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { register, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push("/");
		}
		if (error === "User already exist") {
			setAlert(error, "danger");
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	});
	const { name, email, password, password2 } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();

		if (name === "" || email === "" || password === "") {
			setAlert("Please enter all fields", "danger");
		} else if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else {
			register({
				name,
				email,
				password
			});
		}
	};

	return (
		<div className='form-container'>
			<div className='navbar-second-part'>
				<Link id='optionChosen' to='/register'>
					Register
				</Link>
				<Link to='/login'>Login</Link>
			</div>

			<form onSubmit={onSubmit} id='form'>
				<input
					type='text'
					name='name'
					value={name}
					onChange={onChange}
					required
					placeholder='Name'
					id="nameForm"
					className='inputSearch'
				/>

				<input
					placeholder='Email'
					type='email'
					name='email'
					value={email}
					onChange={onChange}
					required
					className='inputSearch'
				/>

				<input
					placeholder='Password'
					type='password'
					name='password'
					value={password}
					onChange={onChange}
					required
					minLength='6'
					className='inputSearch'
				/>

				<input
					placeholder='Password'
					type='password'
					name='password2'
					value={password2}
					onChange={onChange}
					required
					minLength='6'
					className='inputSearch'
				/>

				<motion.input
					type='submit'
					value='Register'
					name='Search'
					className='btn btn-dark btn-block submitButton'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9, y: "5px" }}
				/>
			</form>
		</div>
	);
};

export default Register;
