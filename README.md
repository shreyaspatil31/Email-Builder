# Email Builder Web Application

## Overview
Email Builder is a full-stack web application that allows users to create and manage email templates with ease. It provides an intuitive interface for editing email templates, uploading images, and customizing content such as titles, footers, and body text.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Java, Spring Boot
- **Database**: MongoDB

## Features
- Fetch and display the base layout HTML for email templates.
- Edit title, content, and footer fields.
- Upload and manage image assets.
- Store email template configurations in a MongoDB database.
- Generate and download the final email template as an HTML file.

## API Endpoints
1. **`/getEmailLayout`**: Fetches the base HTML layout of the email template.
2. **`/uploadImage`**: Uploads image assets for the email template.
3. **`/uploadEmailConfig`**: Stores the email template configuration (JSON object) in the database.
4. **`/renderAndDownloadTemplate`**: Renders the final email template with user input and generates a downloadable HTML file.

## Setup Instructions

### Frontend
1. Clone the repository:
    ```bash
    git clone https://github.com/shreyaspatil31/Email-Builder.git
    ```
2. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the frontend:
    ```bash
    npm start
    ```

### Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/shreyaspatil31/Email-Builder.git
    ```
2. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
3. Build and run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```

### MongoDB
Ensure MongoDB is running on your local machine or use a cloud-based MongoDB service.

![Screenshot 2025-01-22 151523](https://github.com/user-attachments/assets/fea9e310-8ff3-4093-9d33-1587d5eafc47)
![Screenshot 2025-01-22 151602](https://github.com/user-attachments/assets/aac25892-e785-41cf-b5f2-0488f0366ac5)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
