import React, { useEffect, useState } from 'react';
import g from '../../index.module.scss';
import styles from './dashboard.module.scss';
import Loading from '../../components/loading/loading';
import { useSelector } from 'react-redux';
import { getRoles, getDepartments, getTeam } from '../../firebase/firebase';

const Dashboard = () => {
	const uid = useSelector((state) => state.auth.uid);
	const [isLoading, setIsLoading] = useState(true);
	const [roles, setRoles] = useState([]);
	const [depts, setDepts] = useState([]);
	const [team, setTeam] = useState([]);
	useEffect(() => {
		const getData = async () => {
			const r = await getRoles();
			const d = await getDepartments();
			const t = await getTeam(uid);
			setRoles(r);
			setDepts(d);
			setTeam(t);
			setIsLoading(false);
		};
		getData();
	}, [uid]);
	return isLoading ? (
		<Loading />
	) : (
		<div>
			<header>
				<div className={styles.container}>
					<h1 id={styles.text} className={`${g.fshero} ${g.white} ${g.fw900}`}>
						Board Buildr
					</h1>
				</div>
				<div className={styles.overlay}></div>
			</header>
			<main>
				<div className={styles.main_grid}>
					<div id={styles.roles} className={styles.info_container}>
						<h3>Roles</h3>
						<div>
							{roles.map((role) => (
								<button
									className={`${g.bgRed} ${g.white}`}
									id={styles.board_btn}
									key={role.id}>
									{role.name}
								</button>
							))}
						</div>
					</div>
					<div id={styles.depts} className={styles.info_container}>
						<h3>Departments</h3>
						<div>
							{depts.map((dept) => (
								<button
									className={`${g.bgDarkGrey} ${g.white}`}
									id={styles.board_btn}
									key={dept.id}>
									{dept.name}
								</button>
							))}
						</div>
					</div>
					<div id={styles.team} className={styles.info_container}>
						<h3>Your Team</h3>
						<div>
							{team.map((team) => (
								<button
									className={`${g.bgYellow}`}
									id={styles.board_btn}
									key={team.id}>
									{team.name}
								</button>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
export default Dashboard;
