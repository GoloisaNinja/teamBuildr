import React, { useState } from 'react';
import g from '../../index.module.scss';
import styles from './register.module.scss';
import BasicWrapper from '../wrappers/basicWrapper';
import { authenticate } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import {
	getAuth,
	createUserWithEmailAndPassword,
	db,
	doc,
	setDoc,
} from '../../firebase/firebase';

const Register = ({ toggleForm }) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const { name, email, password, confirmPassword } = formData;
	const handleInput = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const isPasswordValid = () => {
		if (password !== confirmPassword) {
			console.log("passwords didn't match");
			return null;
		}
		const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*[^\S]).{8,32}$/g;
		console.log(password.match(regex));
		return password.match(regex);
	};
	const addUserToCollection = async (user) => {
		try {
			await setDoc(doc(db, 'users', user.uid), {
				name,
			});
		} catch (error) {
			console.log(error.message);
		}
	};
	const handleRegistration = (e) => {
		e.preventDefault();
		if (isPasswordValid() === null) {
			alert(
				'password must be at least 8 characters, contain uppercase and lowercase letters, and at least one number.'
			);
			return;
		}
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				if (user.hasOwnProperty('uid')) {
					let u = { uid: user.uid, email: user.email };
					dispatch(authenticate(u));
					addUserToCollection(user);
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
	const handleToggle = () => {
		toggleForm();
	};
	return (
		<BasicWrapper>
			<h4 className={`${g.mgtopl} ${g.mgbottoml}`}>
				Register for a Buildr Account
			</h4>
			<form onSubmit={(e) => handleRegistration(e)}>
				<label>Name</label>
				<input
					name='name'
					type='text'
					required
					autoComplete='name'
					onChange={(e) => handleInput(e)}
				/>
				<label>Email</label>
				<input
					name='email'
					type='email'
					required
					autoComplete='email'
					onChange={(e) => handleInput(e)}
				/>
				<label>Password</label>
				<input
					name='password'
					type='password'
					required
					autoComplete='new-password'
					onChange={(e) => handleInput(e)}
				/>
				<label>Confirm Password</label>
				<input
					name='confirmPassword'
					type='password'
					required
					autoComplete='new-password'
					onChange={(e) => handleInput(e)}
				/>
				<button className={`${g.btnbasic}`} type='submit'>
					register
				</button>
			</form>
			<div className={`${g.mgtopl}`}>
				<p className={`${g.fss}`}>
					Have an account? Login{' '}
					<button className={styles.btnlink} onClick={() => handleToggle()}>
						here
					</button>
				</p>
			</div>
		</BasicWrapper>
	);
};
export default Register;
