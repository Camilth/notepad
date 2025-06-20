// Hier wordt dus echt met de database gepraat, volgens de afspraken uit de interface.
package nl.hu.notepad.dao;

import nl.hu.notepad.Note;
import nl.hu.notepad.GetConnection;
import nl.hu.notepad.dao.NoteDao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class NoteDaoImp implements NoteDao {
    @Override
    public List<Note> getAllNotes() {
        List<Note> notes = new ArrayList<>();
        String query = "SELECT * FROM notes";

        try (Connection connection = GetConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Note note = new Note();
                note.setId(resultSet.getInt("id"));
                note.setTitle(resultSet.getString("title"));
                note.setContent(resultSet.getString("content"));
                note.setCreatedAt(resultSet.getLong("created_at"));
                notes.add(note);
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return notes;
    }

    @Override
    public Note createNote(Note note) {
        String query = "INSERT INTO notes (title, content, created_at) VALUES (?, ?, ?) RETURNING id";
        try (Connection connection = GetConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setString(1, note.getTitle());
            statement.setString(2, note.getContent());
            statement.setLong(3, note.getCreatedAt());
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                note.setId(resultSet.getInt("id"));
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return note;
    }

    @Override
    public void deleteNote(int id) {
        String query = "DELETE FROM notes WHERE id = ?";
        try (Connection connection = GetConnection.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {

            statement.setInt(1, id);
            statement.executeUpdate();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
