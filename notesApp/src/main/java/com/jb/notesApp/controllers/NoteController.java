package com.jb.notesApp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jb.notesApp.beans.Note;
import com.jb.notesApp.services.NoteManager;

@RestController
@RequestMapping("noteAPI")
public class NoteController {

	@Autowired
	private NoteManager noteManager;

	@CrossOrigin(origins = "*")
	@PostMapping("addNote")
	public ResponseEntity<?> addNote(@RequestBody Note note) {
		try {
			this.noteManager.addNote(note);
			return new ResponseEntity<Note>(note, HttpStatus.CREATED);
		}catch (Exception e) {
			return new ResponseEntity<Exception>(e, HttpStatus.FORBIDDEN);
		}
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("getNote")
	public ResponseEntity<?> getNote(@RequestParam int noteId) {
		try {
			Note exist = this.noteManager.getNote(noteId);
			return new ResponseEntity<Note>(exist, HttpStatus.FOUND);
		}catch (Exception e) {
			return new ResponseEntity<Exception>(e, HttpStatus.NOT_FOUND);
		}
	}
	
	@CrossOrigin(origins = "*")
	@DeleteMapping("deleteNote")
	public ResponseEntity<?> deleteNote(@RequestParam int noteId) {
		try {
			this.noteManager.deleteNote(noteId);
			return new ResponseEntity<Void>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Exception>(e, HttpStatus.NOT_FOUND);
		}
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("editNote")
	public ResponseEntity<?> editNote(@RequestBody Note note) {
		try {
			this.noteManager.addNote(note);
			return new ResponseEntity<Note>(note, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Exception>(e, HttpStatus.FORBIDDEN);
		}
	}
	
	
	
	
	
	
	
	
}
