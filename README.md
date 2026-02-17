# JOBS_CRUD - Job Management REST API

A Java powered Backend Project with **CRUD operations** (Create, Read, Update, Delete) using **Spring Boot**, **Spring Data JPA**, and **Hibernate**. This project showcases modern backend development practices for managing job listings and related data through RESTful APIs.



## 🎯 Project Overview

JOBS_CRUD is a REST API backend service that manages job listings and related operations. It demonstrates essential backend development concepts including entity modeling, repository patterns, service layers, and HTTP request handling through a practical, real-world use case.

**Key Features:**
- Full CRUD operations for job management
- RESTful API design patterns
- Data validation and error handling
- Database persistence with JPA/Hibernate
- Service-oriented architecture
- Scalable and maintainable code structure


## 📦 Prerequisites

Before running this project, ensure you have:

1. **Java Development Kit (JDK)** - Version 11 or higher
   ```bash
   java -version
   ```

2. **Maven** - For dependency management
   ```bash
   mvn -version
   ```

3. **PostgreSQL Server** - Running and accessible
   ```bash
   mysql --version
   ```

4. **IDE** - IntelliJ IDEA, Eclipse, or VS Code with Java extensions

5. **Postman/Thunder Client** - For API testing (optional)

:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/jobs_crud_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.root=INFO
logging.level.com.yourcompany.jobs=DEBUG
```


### Step 4: Build the Project

```bash
mvn clean install
```

This downloads all dependencies and compiles the project.




## 🗄 Database Configuration

### Understanding Hibernate DDL Auto Modes

```properties
# create-drop: Creates table, drops on shutdown (development/testing)
spring.jpa.hibernate.ddl-auto=create-drop

# create: Always creates tables (overwrites data)
spring.jpa.hibernate.ddl-auto=create

# update: Adds new columns/tables without losing data (development)
spring.jpa.hibernate.ddl-auto=update

# validate: Validates schema, no changes (production)
spring.jpa.hibernate.ddl-auto=validate

# none: No automatic schema management (production)
spring.jpa.hibernate.ddl-auto=none
```

### Connection Pooling

Spring Boot uses HikariCP by default. Configure pool settings:

```properties
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000
```


# 🚀 Quick Start

## Prerequisites
- Java 11+, Node.js, MySQL

## Setup & Run

### 1. Create Database
```sql
CREATE DATABASE your_database;
```

### 2. Configure Backend
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.password=YOUR_DB_PASSWORD
```

### 3. Run Backend (IntelliJ)
- Open `JobsApplication.java`
- Click ▶️ green play button
- Wait for "Started JobsApplication..."
- Backend runs on `http://localhost:8080`

### 4. Run Frontend (VS Code)
```bash
cd frontend
npm install
npm start
```
- Frontend runs on `http://localhost:3000`

---


## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request


## 📧 Contact

For questions or feedback, reach out to: [Your GitHub Profile](https://github.com/me-aayush)

---
