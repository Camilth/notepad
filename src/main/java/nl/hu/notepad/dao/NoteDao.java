package nl.hu.notepad.dao;

import nl.hu.notepad.Note;
import java.util.List;

public interface NoteDao {
    List<Note> getAllNotes();
    Note createNote(Note note);
    void deleteNote(int id);
}
