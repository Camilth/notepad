package nl.hu.notepad;

public class TestConnectionRunner {
    public static void main(String[] args) {
        try {
            TestConnection.testConnection();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
