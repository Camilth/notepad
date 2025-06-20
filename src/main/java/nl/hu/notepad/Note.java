package nl.hu.notepad;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Note {
    private String title;
    private String content;
    private long createdAt;
    private int id;

    public Note() {}

    public Note(String title, String content) {
        this.title = title;
        this.content = content;
    }


//    getters

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public long  getCreatedAt() { return createdAt; }

//    setters

    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }
    public void setId(int id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setContent(String content) { this.content = content; }
}
