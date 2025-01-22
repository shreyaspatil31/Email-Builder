package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.EmailTemplate;
import com.example.backend.repository.EmailTemplateRepository;
import org.springframework.beans.factory.annotation.Value;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {

    @Autowired
    private EmailTemplateRepository emailTemplateRepository;

    @PostMapping("/uploadEmailConfig")
    public ResponseEntity<String> saveEmailConfig(@RequestBody EmailTemplate emailTemplate) {
        try {
            emailTemplateRepository.save(emailTemplate);
            return ResponseEntity.ok("Email template saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to save template: " + e.getMessage());
        }
    }

    @GetMapping("/templates")
    public ResponseEntity<List<EmailTemplate>> getAllTemplates() {
        try {
            List<EmailTemplate> templates = emailTemplateRepository.findAll();
            return ResponseEntity.ok(templates);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/templates/{id}")
    public ResponseEntity<EmailTemplate> getTemplateById(@PathVariable String id) {
        try {
            Optional<EmailTemplate> template = emailTemplateRepository.findById(id);
            if (template.isPresent()) {
                EmailTemplate emailTemplate = template.get();
                return ResponseEntity.ok(emailTemplate);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/updateEmailConfig/{id}")
    public ResponseEntity<String> updateEmailConfig(@PathVariable String id, @RequestBody EmailTemplate emailTemplate) {
        try {
            Optional<EmailTemplate> existingTemplate = emailTemplateRepository.findById(id);
            if (existingTemplate.isPresent()) {
                emailTemplate.setId(id); // Ensure ID is set correctly
                emailTemplateRepository.save(emailTemplate);
                return ResponseEntity.ok("Email template updated successfully!");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to update template: " + e.getMessage());
        }
    }

}