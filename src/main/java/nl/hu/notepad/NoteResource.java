package nl.hu.notepad;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import nl.hu.notepad.dao.NoteDaoImp;

import java.util.*;

// maakt alle paths aan en roept methodes aan

@Path("/api")
public class NoteResource {
    private static final NoteDaoImp noteDao = new NoteDaoImp();

    @GET
    @Path("/get")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Note> getAllNotes() {
        return noteDao.getAllNotes();
    }

    @POST
    @Path("/new")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Note createNote(Note note) {
        return noteDao.createNote(note);
    }

    @DELETE
    @Path("/delete/{id}")
    public void deleteNote(@PathParam("id") int id) {
        noteDao.deleteNote(id);
    }
}
