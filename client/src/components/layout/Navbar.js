import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";
import user from "./user.svg";
import phone from "./phone.svg";

const Logo = () => {
	return (
		<div id='wrapper'>
			<div className='first-card'>
				<div className="skew-card"></div>
			</div>
			<img src={user} alt='' style={{
				width: "27px",
				position: 'absolute',
				bottom: '24px',
				left: '16px'
			}}/>
			<div className="second-card"/>
			<img src={phone} alt='' style={{
				width: "35px",
				position: 'absolute',
				bottom: '35.5px',
				left: '43px'
			}}/>
		</div>
	);
};

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { isAuthenticated, logout, user } = authContext;
	const { clearContacts } = contactContext;

	const onLogout = () => {
		logout();
		clearContacts();
	};

	const authLinks = (
		<Fragment>
			<li>Hello {user && user.name} </li>
			<li>
				<a onClick={onLogout} href='#!'>
					<i className='fas fa-sign-out-alt' />
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</Fragment>
	);

	return (
		<div className='navbar'>
			<div className='navbar-first-part'>
				<Logo />
				<h1>{title}</h1>
			</div>
			<div >
				<ul>{isAuthenticated ? authLinks : null}</ul>
			</div>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
	title: "Contacts 2.0"
};

export default Navbar;
