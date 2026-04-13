# 💰 PBTracker - Personal Budget Tracker

A full-stack personal finance management application to track income, expenses, and account balances.

## ✨ Features

- 🔐 **User Authentication** - Secure login/registration with JWT  
- 🛡️ **Rate Limiting** - Protection against brute force attacks  
- 💳 **Multi-Account Support** - Track multiple accounts (Cash, Bank, Savings, etc.)  
- 💸 **Transaction Management** - Add income and expense transactions  
- 📊 **Monthly Summary** - Visual overview of income, expenses, and net balance  
- 📈 **Spending Breakdown** - Donut chart showing expense categories  
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices  
- 🎨 **Modern Dark Theme** - Clean interface with gold accents  

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)  
![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=reactrouter&logoColor=white)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white)  
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white)  

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)  
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)  
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white)  
![bcrypt](https://img.shields.io/badge/bcrypt-Encryption-yellow)  
![Rate Limit](https://img.shields.io/badge/Rate_Limit-Security-orange)  

### Database
![MariaDB](https://img.shields.io/badge/MariaDB-003545?logo=mariadb&logoColor=white)  
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)  

---

## 🚀 Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### Installation

```bash
git clone https://github.com/yourusername/pbtracker.git
cd pbtracker
```

### Run the application

```bash
docker-compose up -d
```

---

## 🌐 Access the App

- Frontend: http://localhost:5173  
- Backend API: http://localhost:3000  
- MariaDB: localhost:3306  

---

## 👤 Default Test Account

```
Email: sample@gmail.com
Password: sample123
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/user/register | Register new user |
| POST | /api/user/login | Login user |

### Accounts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/accounts | Get all accounts |
| POST | /api/accounts | Create account |
| PUT | /api/accounts/:id | Update account |
| DELETE | /api/accounts/:id | Delete account |

### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/transactions | Get all transactions |
| GET | /api/transactions/summary | Get monthly summary |
| POST | /api/transactions | Create transaction |
| PUT | /api/transactions/:id | Update transaction |
| DELETE | /api/transactions/:id | Delete transaction |

---

## 🔒 Security Features

- JWT Authentication (token-based auth)
- Password Hashing with bcrypt
- Rate Limiting (100 requests / 15 minutes)
- SQL Injection Protection (parameterized queries)
- CORS Protection

---

## 📝 License

MIT License — feel free to use this project for your portfolio.

---

## 👤 Author

- Name: Your Name  
- GitHub: https://github.com/yourusername  
- Portfolio: https://yourportfolio.com  

---

⭐ If you like this project, consider giving it a star!
