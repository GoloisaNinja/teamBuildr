import styles from './loading.module.scss';
const Loading = () => {
	return (
		<>
			<div className={styles.spinner}></div>
			<div className={styles.overlay}></div>
		</>
	);
};
export default Loading;
