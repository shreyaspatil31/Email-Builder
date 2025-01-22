package com.example.backend.service;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class GridFsService {
    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFsOperations gridFsOperations;

    public String storeFile(MultipartFile file) throws IOException {
        ObjectId fileId = gridFsTemplate.store(
            file.getInputStream(),
            file.getOriginalFilename(),
            file.getContentType()
        );
        return fileId.toString();
    }

    public GridFSFile getFile(String id) {
        return gridFsTemplate.findOne(new Query(Criteria.where("_id").is(new ObjectId(id))));
    }

    public void deleteFile(String id) {
        gridFsTemplate.delete(new Query(Criteria.where("_id").is(new ObjectId(id))));
    }
}