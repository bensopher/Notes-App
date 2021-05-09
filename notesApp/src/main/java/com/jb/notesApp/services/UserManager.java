package com.jb.notesApp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jb.notesApp.beans.Note;
import com.jb.notesApp.beans.User;
import com.jb.notesApp.repos.UserRepository;

@Service
public class UserManager {

	@Autowired
	private UserRepository userRepo;
	
	public void addUser(User user) throws Exception {
		User exist = this.userRepo.findByUserName(user.getUserName());
		if (exist != null) {
			throw new Exception("User with the name "+user.getUserName()+" exist in database");
		}else if (user.getPassword().length() < 4) {
			throw new Exception("User password has to contain at least 4 character");
		}else if (user.getUserName().length() < 4) {
			throw new Exception("User username has to contain at least 4 character");
		}
		this.userRepo.save(user);
	}
	
	public User getUser(User user) throws Exception {
		User exist = this.userRepo.findByUserName(user.getUserName());
		if (exist == null) {
			throw new Exception("User with the name "+user.getUserName()+" does not exist in database");
		}else if (user.getPassword() != exist.getPassword()) {
			throw new Exception("User password "+user.getPassword()+" is incorrect");
		}
		return exist;
	}
	
	public User getUserByName(String userName) throws Exception {
		User exist = this.userRepo.findByUserName(userName);
		if (exist == null) {
			throw new Exception("User with the name "+userName+" does not exist in database");
		}
		return exist;
	}
	
	public User getUserById(int userId) throws Exception {
		User exist = this.userRepo.findById(userId);
		if (exist == null) {
			throw new Exception("User with the id "+userId+" does not exist in database");
		}
		return exist;
	}
	
	public User getUserByPassword(User user) throws Exception {
		User exist = this.userRepo.findByPassword(user.getPassword());
		if (exist == null) {
			throw new Exception("User password is incorrect");
		}
		return exist;
	}
	
	public List<Note> getNotesByUserId(int userId) throws Exception {
		User exist = this.userRepo.findById(userId);
		if (exist == null) {
			throw new Exception("User with the id "+userId+" does not exist in database");
		}
		List<Note> notes = exist.getNotes();
		return notes;
	}
	
	
	
}
