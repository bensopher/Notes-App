package com.jb.notesApp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jb.notesApp.beans.Note;
import com.jb.notesApp.beans.User;
import com.jb.notesApp.services.UserManager;

@RestController
@RequestMapping("userAPI")
public class UserController {

	@Autowired
	private UserManager userManager;
	
	@CrossOrigin(origins = "*")
	@PostMapping("addUser")
	public ResponseEntity<?> addUser(@RequestBody User user) {
		try {
			this.userManager.addUser(user);
			return new ResponseEntity<User>(user ,HttpStatus.CREATED);
		}catch (Exception e) {
			return new ResponseEntity<Exception>(e, HttpStatus.FORBIDDEN);
		}
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("getNotes")
	public ResponseEntity<?> getNotesByUserId(@RequestParam int userId) {
		try {
			List<Note> notes = this.userManager.getNotesByUserId(userId);
			return new ResponseEntity<List<Note>>(notes, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Exception>(e, HttpStatus.NOT_FOUND);
		}
	}
	
	
	@CrossOrigin(origins = "*")
	@GetMapping("getUserById/{userId}")
	public ResponseEntity<?> getUserByUserId(@PathVariable int userId) {
		try {
			User exist = this.userManager.getUserById(userId);
			return new ResponseEntity<User>(exist, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Exception>(e, HttpStatus.NOT_FOUND);
		}
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("getUserByName/{userName}")
	public ResponseEntity<?> getUserByUserName(@PathVariable String userName) {
		try {
			User exist = this.userManager.getUserByName(userName);
			return new ResponseEntity<User>(exist, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Exception>(e, HttpStatus.NOT_FOUND);
		}
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("getUser")
	public ResponseEntity<?> getUser(@RequestBody User user) {
		try {
			User exist = this.userManager.getUserByPassword(user);
			return new ResponseEntity<User>(exist, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Exception>(e, HttpStatus.NOT_FOUND);
		}
	}
	
	
}
