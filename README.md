🚗 Car Suggestion Platform

“I don’t know what car to buy”
to
“I’m confident about my shortlist.”

Built as an MVP focused on speed, usability, and recommendation quality.

******************************************************************************

🌐 Live Demo
Frontend

https://car-suggestion-platform.vercel.app/

Backend API

https://car-suggestion-platform-production.up.railway.app/

******************************************************************************

## 🚀 Running Locally

### 1. Clone Repository

```bash
git clone https://github.com/arfat-sayyed/car-suggestion-platform.git
cd car-suggestion-platform
```

### 2. Add Environment Variables

#### `backend/.env`

```env
PORT=5001
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

#### `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5001/api/v1
```

### 3. Install & Run

```bash
npm run dev
```

This command will:

* Install backend dependencies
* Install frontend dependencies
* Start backend server
* Start frontend app

### 4. Seed Cars Data

Populate MongoDB with sample cars:

```bash
cd backend
npm run seed:cars
```

Expected output:

```bash
MongoDB connected
Cars seeded successfully
```

### 5. Open App

Frontend:

```txt
http://localhost:5173
```

Backend Health API:

```txt
http://localhost:5001/api/v1/health
```


******************************************************************************

🎯 My MVP Approach

Instead of building a huge marketplace clone, I focused on the highest-value user problem:

Smart personalized recommendations.
The MVP flow is intentionally simple:

User enters preferences
Platform understands needs
Recommendation engine scores cars
User receives a confident shortlist

This prioritizes decision-making over browsing, which is the core problem in the brief.

******************************************************************************

✨ Features
Personalized Car Recommendation Engine

Users can filter based on:

Budget
Fuel Type
Transmission
Body Type
Family Size
Usage Type
Priorities (Safety, Mileage, Features)

The system intelligently scores cars and returns the top matching recommendations.

******************************************************************************

🏗️ Architecture

This project uses a monorepo architecture.

car-suggestion-platform/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── car/
│   │   │   ├── recommendation/
│   │   │   └── meta/
│   │   └── routes/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── api/
│
└── README.md

******************************************************************************

⚙️ Tech Stack
Frontend
React
Vite
React Router
Axios
Tailwind CSS
Backend
Node.js
Express.js
REST APIs
Database
MongoDB Atlas
Mongoose ODM
Deployment
Frontend → Vercel
Backend → Railway
Database → MongoDB Atlas

******************************************************************************

Environment Variables
Backend .env
PORT=5001
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
Frontend .env
VITE_API_BASE_URL=http://localhost:5001/api/v1

******************************************************************************

🤖 AI Usage
AI tools were actively used during development for:

Architecture brainstorming
API structure suggestions
UI iteration
Debugging deployment issues
Recommendation logic refinement
Code quality reviews

However:

All product decisions were manually scoped
Recommendation logic was designed and customized intentionally
Architecture and tradeoffs were chosen deliberately for MVP quality and scalability

AI accelerated execution, but product direction and engineering decisions remained human-driven.

******************************************************************************

⚖️ Tradeoffs & Scope Decisions

To ship a strong MVP quickly, I intentionally avoided:

Authentication

Not necessary for validating recommendation quality.

Large-scale search & pagination

Recommendations mattered more than browsing.

Real-time AI chatbot

Would increase complexity without improving recommendation confidence significantly.

Huge car dataset

Focused on a curated dataset to validate recommendation quality first.

******************************************************************************

🔮 What I’d Build Next

If given more time:

Smarter recommendation intelligence

Move from weighted scoring to ML/ranking models.

Compare Cars

Side-by-side comparison experience.

Saved Shortlists

Bookmark and revisit recommendations.

Better Recommendation Explanations

Explain why a car is recommended.

Real Dataset Integration

Integrate live automobile APIs.

AI Copilot

Natural language:

“I need a safe family SUV under 20 lakhs.”

******************************************************************************

✅ Outcome

The MVP successfully solves the core problem:

Helping confused buyers confidently shortlist the right cars through personalized recommendations.