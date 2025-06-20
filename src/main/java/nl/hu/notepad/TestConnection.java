package nl.hu.notepad;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TestConnection {
    public static void testConnection() throws SQLException, ClassNotFoundException {
        // ! DEZE CODE IS NIET DOOR MIJ GEMAAKT EN DIRECT GEBRUIKT VAN DEKENNISBANK
        try (Connection connection = GetConnection.getConnection()) {

            String query = "SELECT * FROM notes;";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet set = statement.executeQuery();

            while (set != null && set.next()) {
                System.out.println(set.getString("id"));
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
