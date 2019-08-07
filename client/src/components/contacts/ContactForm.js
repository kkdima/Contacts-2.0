import React, { useState, useContext, useEffect } from "react";
import ContactContext from '../../context/contact/contactContext'
import { motion } from "framer-motion";

const ContactForm = () => {
    const contactContext = useContext(ContactContext)

    const { addContact, clearCurrent, updateContact,  current } = contactContext;

    useEffect(() => {
        if(current !== null) {
            setContact(current);
        } else {
            setContact({
                name: "",
                email: "",
                phone: "",
                type: "personal"
            });
        }
    }, [contactContext, current]);
    
	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		type: "personal"
	});

    const { name, email, phone, type } = contact;
    
    const onChange = e => 
        setContact({ ...contact, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        if(current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }
    
	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>{current ? 'Edit Contact' : 'Add contact'}</h2>
			<input
				type='text'
				placeholder='Name'
				name='name'
				value={name}
                onChange={onChange}
                className='inputSearch'                
			/>
			<input
				type='email'
				placeholder='Email'
				name='email'
				value={email}
                onChange={onChange}
                className='inputSearch'
			/>
			<input
				type='text'
				placeholder='Phone'
				name='phone'
				value={phone}
                onChange={onChange}
                className='inputSearch'
			/>
			<h5 id='content-type'>Contact Type</h5>
			<input
				type='radio'
				name='type'
				value='personal'
                checked={type === "personal"}
                onChange={onChange}     
                className='m'
			/>Personal{" "}
			<input
				type='radio'
				name='type'
				value='professional'
                checked={type === "professional"}
                onChange={onChange}
                className='m inputlast'
			/>Professional
            <div>
                {/* <input type="submit" value={current ? 'Update Contact' : 'Add contact'} className='btn btn-primary btn-block'/> */}
                <motion.input
                    type='submit'
                    value={current ? 'Contact' : 'Add contact'}
					name='Search'
					className='btn btn-dark btn-block submitButton'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9, y: "5px" }}
                    />
            </div>
            {current && (
                <div>
                    <motion.button 
                        className="btn btn-light btn-block submitButton" 
                        onClick={clearAll}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9, y: "5px" }}
                    >
                        Clear
                    </motion.button>
                </div>
            )}
		</form>
	);
};

export default ContactForm;
