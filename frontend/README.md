# let's Poll 

A simple real-time polling application where users can create polls, vote, and see instant results.

## Features

=>Create polls with 2-4 options  
=>Vote on polls  
=>See results instantly  
=>Delete polls  
=>No login required  

## Tech Stack

**Backend:** Node.js + Express + MongoDB  
**Frontend:** React + Axios  

## Installation

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=mongodb://localhost:27017/polls   
PORT=3000
```

Start server:
```bash
npm start
```

Server runs on `http://localhost:3000`

---

### Frontend Setup

```bash
cd frontend
npm install
```

Start React:
```bash
npm start
```

Frontend runs on ` http://localhost:5173/` 

---

## How to Use

### 1️ Create a Poll
- Enter your question
- Add 2-4 options
- Click "Create Poll"

### 2️ Vote
- Click any option button
- Results appear instantly

### 3️ See Results
- Progress bars show percentages
- Vote counts displayed
- Winner marked with 🏆

### 4️ Delete Poll
- Click "🗑 Delete" button
- Poll is removed

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/polls` | Get all polls |
| POST | `/polls` | Create a new poll |
| POST | `/polls/:id/vote` | Vote on a poll |
| GET | `/polls/:id/results` | Get poll results |
| DELETE | `/polls/:id` | Delete a poll |

---

## Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── pollController.js
│   │   ├── models/
│   │   │   └── poll.model.js
│   │   ├── routes/
│   │   │   └── pollroutes.js
│   │   ├── middlewares/
│   │   │   └── errormiddleware.js
│   │   └── app.js
│   ├── .env
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axiosInstance.js
    │   │   └── pollApi.js
    │   ├── components/
    │   │   ├── CreatePoll.jsx
    │   │   └── PollCard.jsx
    │   ├── pages/
    │   │   └── Home.jsx
    │   └── App.jsx
```

---

## Database Schema

```javascript
 question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    options: {
      type: [
        {
          text: {
            type: String,
            required: [true, "Option text is required"],
            trim: true,
          },
          votes: {
            type: Number,
            default: 0,
          },
        },
      ],
    }
```
 