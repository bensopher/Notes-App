package com.jb.notesApp.repos;

import org.springframework.data.repository.CrudRepository;

import com.jb.notesApp.beans.Note;

public interface NoteRepository extends CrudRepository<Note, Integer> {
	public Note findById(int noteId);
}
