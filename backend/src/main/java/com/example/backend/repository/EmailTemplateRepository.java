package com.example.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.model.EmailTemplate;

public interface EmailTemplateRepository extends MongoRepository<EmailTemplate, String> {
}

