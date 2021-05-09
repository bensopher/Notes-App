package com.jb.notesApp.beans;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="notes")
public class Note {
	
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int id;
	
	private String title;
	private String body;
	private int priority = 3;
	private boolean flag = false; //false=unread
	private String color;
	private String icon;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="user_id", nullable=true)
	@JsonIgnoreProperties({"notes", "password"})
	private User user;
	
	public Note() {}

	public Note(String title, String body, int priority, String color, String icon, User user) {
		super();
		this.title = title;
		this.body = body;
		this.priority = priority;
		this.color = color;
		this.icon = icon;
		this.user = user;
	}
	
	
	public int getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public boolean isFlag() {
		return flag;
	}

	public void setFlag(boolean flag) {
		this.flag = flag;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	@Override
	public String toString() {
		return "Note [id=" + id + ", title=" + title + ", body=" + body + ", priority=" + priority + ", flag=" + flag
				+ ", color=" + color + ", icon=" + icon + ", user=" + user + "]";
	}
	
	

}
