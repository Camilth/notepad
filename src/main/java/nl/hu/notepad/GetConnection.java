package nl.hu.notepad;

import java.sql.SQLException;
import java.sql.Connection;
import java.sql.DriverManager;

public class GetConnection {
    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        Class.forName("org.postgresql.Driver");
        String url = "jdbc:postgresql://localhost/Commit?user=postgres&password=dikkiedik";
        return DriverManager.getConnection(url);
    }
}
