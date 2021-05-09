package com.jb.notesApp.repos;

import org.springframework.data.repository.CrudRepository;

import com.jb.notesApp.beans.User;

public interface UserRepository extends CrudRepository<User, Integer>{
	public User findByUserName(String userName);
	public User findByPassword(String password);
	public User findById(int userId);

}
