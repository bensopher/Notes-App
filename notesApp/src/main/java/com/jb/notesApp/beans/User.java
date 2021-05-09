package com.jb.notesApp.beans;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="users")
public class User {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int id;
	
	private String userName;
	private String password;
	
	
	@OneToMany(mappedBy="user", fetch = FetchType.EAGER, cascade= CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Note> notes = new ArrayList<Note>();
	
	public User() {}
	
	public User(String userName, String password) {
		super();
		this.userName=userName;
		this.password=password;
	}

	public int getId() {
		return id;
	}
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Note> getNotes() {
		return notes;
	}

	public void setNotes(List<Note> notes) {
		this.notes = notes;
	}
	
	public void deleteNote(Note note) {
		this.notes.remove(note);
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", notes=" + notes + "]";
	}

	
	
	
}
