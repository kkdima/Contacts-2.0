import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = props => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push("/");
		}
		if (error === "Invalid Credentials") {
			setAlert(error, "danger");
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		email: "",
		password: ""
	});
	const { email, password } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		if (email === "" || password === "") {
			setAlert("Please fill in all fields");
		} else {
			login({
				email,
				password
			});
		}
	};

	return (
		<div className='form-container'>
			<div className='navbar-second-part'>
				<Link to='/register'>Register</Link>
				<Link id='optionChosen' to='/login'>
					Login
				</Link>
			</div>

			<form onSubmit={onSubmit}>
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
				<motion.input
					type='submit'
					value='Login'
					name='Search'
					className='btn btn-dark btn-block submitButton'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9, y: "5px" }}
				/>
			</form>
		</div>
	);
};

export default Login;
