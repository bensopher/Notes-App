package com.jb.notesApp.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jb.notesApp.beans.Note;
import com.jb.notesApp.beans.User;
import com.jb.notesApp.repos.NoteRepository;
import com.jb.notesApp.repos.UserRepository;

@Service
public class NoteManager {

	@Autowired
	private NoteRepository noteRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	public void addNote(Note note) throws Exception {
		if (note.getTitle().equalsIgnoreCase("")) {
			throw new Exception("Note has to have some text in title field");
		}else if (note.getPriority() > 5 || note.getPriority() < 1) {
			throw new Exception("Note priority has to be between 1-5");
		}
		this.noteRepo.save(note);
	}
	
	public Note getNote(int noteId) throws Exception {
		Note exist = this.noteRepo.findById(noteId);
		if(exist == null) {
			throw new Exception("Note with the id "+noteId+" does not exist in database");
		}
		return exist;
	}
	
	public void deleteNote(int noteId) throws Exception {
		Note exist = this.getNote(noteId);
		User user = exist.getUser();
		user.deleteNote(exist);
		this.userRepo.save(user);		
	}
}
