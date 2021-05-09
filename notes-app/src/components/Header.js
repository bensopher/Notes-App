import notesIcon from './notes-svgrepo-com.svg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';



export default function Header() {
    
    const token = useSelector((state) => {
		return state.user.token;
    })

    const isLoggedIn = () => {
        if (!token) {
            return true;
        }
        return false;
    }
    
    return (
        <AppBar position="static" className="header">
            <Toolbar className="d-flex justify-content-between">
                <div className="d-flex">
                    <Avatar alt="app icon" src={notesIcon} />
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isLoggedIn() 
                        ?   <li className="nav-item">
                                <Link className="nav-link active text-white" to="/">
                                    Login
							    </Link>
                            </li>
                        :   <li>
                                <Link className="nav-link active text-white" onClick={function () { window.location.replace("/"); localStorage.clear(); }} to="">
                                    LogOut
							    </Link>    
                            </li>
                        }
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/notes">
                                Notes
							</Link>
                        </li>
                    </ul>
                </nav>
            </Toolbar>
        </AppBar>
    )
}
