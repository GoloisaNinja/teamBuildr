import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../components/loading/loading';

const PrivateRoute = () => {
	const { isAuthenticated, loading } = useSelector((state) => state.auth);
	return loading ? (
		<Loading />
	) : isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate replace to='/' />
	);
};
export default PrivateRoute;
