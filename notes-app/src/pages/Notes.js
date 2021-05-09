import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Notes() {
	const [notesList, setNotesList] = useState([]);
	const history = useHistory();
	const token = useSelector((state) => {
		return state.user.token;
	})


	const handleOnClickNewNote = () => {
		if (token === null) {
			window.alert("YOU ARE LOGGED OUT TRY TO LOG IN FIRST!")
			history.push("/");
		} else history.push("/newNote");
	}

	const handleOnClickView = (note) => {
		localStorage.setItem('note', JSON.stringify(note));
		history.push("/editNote");
	}


	const loadNotes = async () => {
		const response = await fetch(
			`http://localhost:8080/userAPI/getNotes?userId=${token}`,//need to make dynamic
			{
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			}
		);
		const notes = await response.json();
		setNotesList(notes);
	}

	const handleDelete = async (note) => {
		await fetch(`http://localhost:8080/noteAPI/deleteNote?noteId=${note.id}`,//need to make dynamic
			{
				method: 'DELETE'
			});
		loadNotes();
	}

	useEffect(
		() => {
			if (!token) return;
			loadNotes()
		},
		[]
	)
	return (
		<div>
		<Paper className="p-6">
			<div className="d-flex justify-content-center mb-6">
				<Button color="primary" size="large" variant="contained" onClick={handleOnClickNewNote}>
					Add new note
				</Button>
			</div>
			<ul className="list-group">
				{
					notesList.map(function (note) {
						return (
							<li className="align-items-center list-group-item d-flex justify-content-between" key={note.id}>
								<div>
									<h1>
										{
											note.flag ? note.title : <u>{note.title}</u>
										}
									</h1>
								</div>
								<div >
									<IconButton aria-label="view" onClick={function () { handleOnClickView(note) }}>
										<VisibilityIcon fontSize="small" />
									</IconButton>

									<IconButton aria-label="delete" onClick={function () { handleDelete(note) }} >
										<DeleteIcon fontSize="small" />
									</IconButton>
								</div>
							</li>
						)
					})
				}
			</ul>
			</Paper>
			</div>
	)
}