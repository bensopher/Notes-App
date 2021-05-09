import { Button, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { CirclePicker } from 'react-color';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { useSelector } from 'react-redux'; 

export default function EditNote() {
    
    const [values, setValues] = useState(JSON.parse(localStorage.getItem('note')));
    const history = useHistory();
    const token = useSelector((state) => {
		return state.user.token;
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
        titlebool:null
	})
    
    
    const handleSubmit = async (event) => {
        
        event.preventDefault()

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

        const updatedValues = {...values, flag: true}
        await fetch(
        `http://localhost:8080/noteAPI/editNote`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedValues),
        }
        )
        localStorage.removeItem('note')
        history.goBack()
    }

    const handleChange = (event) => {
        event.preventDefault()
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
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

    return (
    <div>
        <Paper className={classes.paper}>
			<form noValidate onSubmit={handleSubmit}>
                <div className="form-group">
                    <TextField
                        error={errors.titlebool}         
                        id="title"
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
                        className="w-100 h-800"
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