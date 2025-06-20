package nl.hu.notepad;

import java.sql.SQLException;

public class CloseConnection {
    public static void closeConnection() throws SQLException, ClassNotFoundException {
        if (GetConnection.getConnection() != null) {
            GetConnection.getConnection().close();
        }
    }
}
