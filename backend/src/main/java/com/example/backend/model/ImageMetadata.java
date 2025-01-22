package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images")
public class ImageMetadata {
    @Id
    private String id;
    private String filename;
    private String contentType;
    private long size;

    public ImageMetadata() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }
    
    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }
    
    public long getSize() { return size; }
    public void setSize(long size) { this.size = size; }
}
