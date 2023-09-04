import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing/landing';
import Dashboard from '../pages/Dashboard/dashboard.js';
import PrivateRoute from './PrivateRoute';
import { Provider } from 'react-redux';
import store from '../store';

const AppRouter = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/dashboard' element={<PrivateRoute />}>
						<Route path='/dashboard' element={<Dashboard />} />
					</Route>
					{/* <Route path='*' element={<NotFound />} /> */}
				</Routes>
			</Router>
		</Provider>
	);
};
export default AppRouter;
