# 📋 DevPulse: Issue Tracker System API

## 🚀 Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,ts,express,postgres" />
</p>

A lightweight, high-performance RESTful API designed for managing software development workflows. Built using **TypeScript**, **Express.js**, and **Raw SQL (node-postgres)** — no heavy ORM — ensuring blazing-fast query execution and precise transaction control.

---

## 🚀 Live Links

- **Production API:** https://dev-pulse-b7-a2-seven.vercel.app  
- **Database Host:** NeonDB (Serverless PostgreSQL)

---

## 📌 Project Overview

DevPulse is a scalable issue tracking backend system built to streamline development workflows with secure authentication, strict role-based access control, and optimized database operations.

### ⚡ Key Architectural Highlights

| ⚡ Feature Area | 📌 Implementation Details |
|---|---|
| 🔐 JWT Authentication & Authorization | Secure JWT token-based authentication with protected private routes and role-based access control for Contributors & Maintainers |
| 🚫 Zero ORM | Built entirely with raw SQL queries using parameterized statements to prevent SQL Injection and improve performance control |
| ⚡ Optimized Relational Fetching | Avoids expensive SQL JOIN operations by using decoupled relational fetching and batch-query techniques |
| 🧩 Clean Service-Based Architecture | Modular folder structure with separated services, controllers, middleware, and reusable response handlers |
| 📊 Dynamic Query Features | Supports filtering by issue type/status, sorting by newest or oldest issues, and efficient single & bulk retrieval |

---

## 👥 User Roles & Permissions

| Feature / Action | ⚒️ Contributor | 🛡️ Maintainer | 🌐 Public |
|------------------|----------------|----------------|------------|
| Register | ✅ | ✅ | ✅ |
| Login & Obtain JWT Token | ✅ | ✅ |  ❌ |
| View Issues | ✅ | ✅ | ✅ |
| View Single Issue | ✅ | ✅ | ✅ |
| Create Issue | ✅ | ✅ | ❌ |
| Update Issue | ✅ (Own & Open Only) | ✅ | ❌ |
| Delete Issue | ❌ | ✅ | ❌ |

---

## 🛣️ API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|-----------|---------|-------------|
| POST | `/api/auth/signup` | Public | Register a new user as Contributor or Maintainer |
| POST | `/api/auth/login` | Public | Authenticate user & receive JWT token |

---

### 🐞 Issues (`/api/issues`)

| Method | Endpoint | Access | Description |
|--------|-----------|---------|-------------|
| POST | `/api/issues` | Contributor / Maintainer | Create a new issue using authenticated user identity |
| GET | `/api/issues` | Public | Retrieve all issues with filtering & sorting support |
| GET | `/api/issues/:id` | Public | Retrieve full details of a single issue |
| PATCH | `/api/issues/:id` | Contributor (Own & Open Only) / Maintainer | Update issue details |
| DELETE | `/api/issues/:id` | Maintainer | Permanently delete an issue | |

---

## ⚙️ Local Setup Guide

### 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (NeonDB recommended)

---

### 🏃 Installation Steps

```bash
# Clone repository
git clone https://github.com/sakib404-hub/Dev-Pulse-B7A2.git

# Navigate into project
cd B7A2-Dev-Pulse

# Install dependencies
npm install

# running the server
npm run dev
```
### 🔐 Environment Variables
```bash
Create a .env file:
PORT=5000
DATABASE_URL=postgres://<user>:<password>@<host>/<database_name>?sslmode=require
JWT_SECRET=your_super_secure_secret
```

## 🗄️ Database Setup

Execute the following relational blueprints inside your PostgreSQL database console or NeonDB SQL editor.

---

# 👤 Users Table

```sql
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,

    role VARCHAR(50) DEFAULT 'contributor'
    CHECK(role IN ('contributor', 'maintainer')),

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 🐞 Issues Table
🐞 bug or 
🚀 Feature Request
```sql
CREATE TABLE IF NOT EXISTS issues(
    id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    description TEXT NOT NULL
    CHECK(char_length(description) >= 20),

    type VARCHAR(100) NOT NULL
    CHECK(type IN ('bug', 'feature_request')),

    status VARCHAR(30) DEFAULT 'open'
    CHECK(status IN ('open', 'in_progress', 'resolved')),

    reporter_id INT NOT NULL REFERENCES users(id),

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 👨‍💻 Author

<div align="center">

<br/>
<h3>Md. Shakib Hossen</h3>
<p>
    Passionate about backend engineering, clean architecture, and building scalable web applications.
  <br>
  🚀 Learning continuously • Building consistently • Improving every day
</p>
<br/>

<a href="https://github.com/sakib404-hub">
  <img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github"/>
</a>
<a href="www.linkedin.com/in/sakibhossen-dev7011">
  <img src="https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>

</div>
