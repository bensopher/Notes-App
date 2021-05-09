import { Button, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { CirclePicker } from 'react-color';
import {useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import EditLocationIcon from '@material-ui/icons/EditLocation';

export default function NewNote() {

    const token = useSelector((state) => {
		return state.user.token;
	})

    const history = useHistory();

    const [values, setValues] = useState({
        title: '',
        body: '',
        priority: 3,
        flag: false,
        color: '',
        icon: '',
        user: {
            id: token
        }
    })

    const useStyles = makeStyles(() => ({
        paper: {
            backgroundColor: `${values.color}`,
            padding: 40
        }
    }))

    const classes = useStyles();
    
    const [errors, setErrors] = useState({
        title: null,
        titlebool: null
	})
    
    const handleSubmit = async (event) => {
		
        event.preventDefault();

        let isValid = true;
		let newErrors = { title: null};
		if (!values.title) {
			isValid = false;
			newErrors = {
				...newErrors,
                title: 'This field is required',
                titlebool:true
			}
		}
		
		if (values.title.length < 4) {
			isValid = false;
			newErrors = {
				...newErrors,
                title: 'Minimal length of 4 characters',
                titlebool:true
			}
		}
		
		setErrors(newErrors);
		if (!isValid) {
			return;
        };

        const newValues = {...values}
        await fetch(
            `http://localhost:8080/noteAPI/addNote`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newValues),
            }
            )
        history.goBack();
    }

    const handleChange = (event) => {
		event.preventDefault()
        setValues({
			...values,
			[event.target.name]: event.target.value
		})
    }

    const handleColorChange = (color) => {
        setValues({
            ...values,
            'color': color.hex
        })
    }

    const handleRatingChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: parseInt(event.target.value) 
        })
    }
    const handleIconChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    useEffect(
        () => {
            if (!token) return;
        },
        [
            token,
            history
        ]
    )

    return (
        <div>
            <Paper className={classes.paper}>
                <form noValidate onSubmit={handleSubmit}>
                    <div className="form-group">
                        <TextField
                            error={errors.titlebool}    
                            id="title"
                            label="Title"
                            variant="outlined"
                            className="w-100 h-100" 
                            name="title" 
                            type="text"
                            placeholder="Title"
                            margin="normal"
                            readOnly={false}
                            value={values.title}
                            onChange={handleChange}
                            helperText={errors.title}
                        />
                    </div>
                    <div className="form-group">
                        <TextField  
                            id="body"
                            label="Note Body"
                            variant="outlined"
                            className="w-100 h-100"
                            name="body"
                            type="text"
                            placeholder="Enter your note here..."
                            margin="normal"
                            multiline={true}
                            value={values.body}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text-center d-flex justify-content-between">
                            <CirclePicker
                                onChange={handleColorChange}
                            />
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend">Priority</Typography>
                                <Rating
                                    name="priority"
                                    value={values.priority}
                                    readOnly={false}
                                    onChange={handleRatingChange}
                                    />
                            </Box>
                            <Select
                                id="icon"
                                name="icon"
                                variant="outlined"
                                value={values.icon}
                                onChange={handleIconChange}
                            >
                            <MenuItem value="<AssignmentIcon />"> <AssignmentIcon /> </MenuItem>
                            <MenuItem value="<EventNoteIcon />"> <EventNoteIcon /> </MenuItem>
                            <MenuItem value="<EmailIcon />"> <EmailIcon /> </MenuItem>
                            <MenuItem value="<AssignmentTurnedInIcon />"> <AssignmentTurnedInIcon /> </MenuItem>
                            <MenuItem value="<EditLocationIcon />"> <EditLocationIcon /> </MenuItem>
                            </Select>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                size="large"
                            >
                            Save
                            </Button>
                    </div>
                </form>  
            </Paper>
        </div>
        )
}