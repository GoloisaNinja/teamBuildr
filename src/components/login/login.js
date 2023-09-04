import React, { useState } from 'react';
import g from '../../index.module.scss';
import styles from './login.module.scss';
import BasicWrapper from '../wrappers/basicWrapper';
import { getAuth, signInWithEmailAndPassword } from '../../firebase/firebase';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router';

const Login = ({ toggleForm }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;
	const dispatch = useDispatch();
	const handleLogin = (e) => {
		e.preventDefault();
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				if (user.hasOwnProperty('uid')) {
					let u = { uid: user.uid, email: user.email };
					dispatch(authenticate(u));
					navigate('/dashboard');
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
	const handleToggle = () => {
		toggleForm();
	};
	const handleInput = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	return (
		<BasicWrapper>
			<h4 className={`${g.mgtopl} ${g.mgbottoml}`}>
				Login to your Buildr Account
			</h4>
			<form onSubmit={(e) => handleLogin(e)}>
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
					autoComplete='current-password'
					required
					onChange={(e) => handleInput(e)}
				/>
				<button className={`${g.btnbasic}`} type='submit'>
					login
				</button>
			</form>
			<div className={`${g.mgtopl}`}>
				<p className={`${g.fss}`}>
					Need an account? Register{' '}
					<button className={styles.btnlink} onClick={() => handleToggle()}>
						here
					</button>
				</p>
			</div>
		</BasicWrapper>
	);
};
export default Login;
