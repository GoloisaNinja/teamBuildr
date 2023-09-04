import React, { useState } from 'react';
import g from '../../index.module.scss';
import styles from './landing.module.scss';
import Login from '../../components/login/login';
import Register from '../../components/register/register';

function Landing() {
	const [showLogin, setShowLogin] = useState(true);
	const toggleForm = async () => {
		setShowLogin(!showLogin);
	};
	return (
		<div>
			<header>
				<div className={styles.hero_grid}>
					<h1 id={styles.text} className={`${g.fshero} ${g.white} ${g.fw900}`}>
						Team Buildr
					</h1>
					<h3 id={styles.subtext} className={g.white}>
						Build your team. Design Development Paths. Manage Like A Bot.
					</h3>
				</div>
				<div className={styles.overlay}></div>
			</header>

			{showLogin ? (
				<Login toggleForm={toggleForm} />
			) : (
				<Register toggleForm={toggleForm} />
			)}
		</div>
	);
}

export default Landing;
