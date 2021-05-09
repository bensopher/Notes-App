import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/user.actions';

export default function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	
	const [ values, setValues ] = useState({
		userName: '',
		password: ''
	})
	
	const [errors, setErrors] = useState({
		userName: null,
		password: null,
		userNameBool: null,
		passwordBool:null
	})
	
	const handleSubmit = async (event) => {
		
		event.preventDefault();
		
		// validate the input
		let isValid = true;
		let newErrors = { userName: null, password: null};
		if (!values.userName) {
			isValid = false;
			newErrors = {
				...newErrors,
				userName: 'This field is required',
				userNameBool: true
			}
		}

		if (values.userName.length < 4) {
			isValid = false;
			newErrors = {
				...newErrors,
				userName: 'Minimal length of 4 characters',
				userNameBool: true
			}
		}

		if (!values.password) {
			isValid = false;
			newErrors = {
				...newErrors,
				password: 'This field is required',
				passwordBool:true
			}
		}

		if (values.password.length < 4) {
			isValid = false;
			newErrors = {
				...newErrors,
				password: 'Minimal length of 4 characters',
				passwordBool:true
			}
		}
		
		setErrors(newErrors);
		if (!isValid) {
			return;
		};
		
		setIsLoading(true);
		const response = await fetch(
			`http://localhost:8080/userAPI/getUser`,
			{
				method: 'POST',
				body: JSON.stringify(values),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		const data = await response.json();
		console.log(data);
		if (values.password !== data.password) {
			isValid = false;
			newErrors = {
				...newErrors,
				password: 'Password is wrong',
				passwordBool: true
			}
			window.alert("PASSWORD IS WRONG");
			setIsLoading(false);
		} else if (values.userName !== data.userName) {
			isValid = false;
			newErrors = {
				...newErrors,
				userName: 'User name does not exist',
				userNameBool:true
			}
			window.alert("USER NAME IS WRONG");
			setIsLoading(false);
		} else {
			dispatch(setToken(data.id));
			setIsLoading(false);
			history.push("/notes");
		}	
	}
	
	const handleChange = ( event ) => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		})
	}
	
	return (
		<Paper className="p-4">
			<form noValidate onSubmit={handleSubmit}>
				<Typography className="text-center" variant="h4">Login</Typography>
				<div className="form-group">
					<TextField
						error={errors.userNameBool}
						value={ values.userName } 
						onChange={ handleChange }
						className="w-100" 
						name="userName"
						helperText={errors.userName}
						placeholder="Enter your user name"
					/>
				</div>
				<div className="form-group">
					<TextField 
						error={errors.passwordBool}
						value={ values.password }
						onChange={ handleChange }
						className="w-100"
						name="password" 
						type="password"  
						helperText={errors.password}
						placeholder="Enter your password"
					/>
                </div>
                <div className="text-center">
				    <Button
					    variant="contained"
					    color="primary"
					    disabled={isLoading}
                        type="submit"
				    >
                    Submit
				    </Button>
                </div >
				{
					isLoading && <div className="text-center"> <CircularProgress size={24} /></div>
				}
			</form>
		</Paper>
		
	)
}