import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Notes from './pages/Notes';
import { Route, Switch, useHistory } from 'react-router-dom';
import NewNote from './pages/NewNote';
import EditNote from './pages/EditNote';
import { useSelector } from 'react-redux';

function App() {

	const token = useSelector((state) => {
		return state.user.token;
	})
	
	const history = useHistory()

	const isLoggedIn = () => {
		if (!token) {
			localStorage.clear();
            return true;
        }
        return false;
	}

	return (
		<div className="h-50 d-flex flex-column justify-content-between">
			<Header />

			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-8">
						<Switch>
							<Route path="/" exact>
								<Login />
							</Route>
							<Route path="/notes" exact>
								{isLoggedIn() ? history.push("/"): <Notes />}
							</Route>
							<Route path="/newNote" exact>
								{isLoggedIn() ? history.push("/"): <NewNote />}
							</Route>
							<Route path="/editNote" exact>
								{isLoggedIn() ? history.push("/"): <EditNote />}
							</Route>
						</Switch>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
