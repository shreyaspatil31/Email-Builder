package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "emailTemplates")
public class EmailTemplate {
    @Id
    private String id;
    private String title;
    private String content;
    private String footer;
    private String imageFileName; // Add this field to store the actual filename

    // Default constructor
    public EmailTemplate() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public String getFooter() { return footer; }
    public void setFooter(String footer) { this.footer = footer; }
    
    public String getImageFileName() { return imageFileName; }
    public void setImageFileName(String imageFileName) { this.imageFileName = imageFileName; }
}