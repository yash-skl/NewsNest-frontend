# NewsNest

NewsNest is a full-stack MERN application that scrapes the top stories from Hacker News and allows authenticated users to bookmark stories for later reading.

The project was built as part of a MERN stack assignment and focuses on backend architecture, authentication, API integration, and frontend usability.

---

## Features

### Web Scraper
- Scrapes top stories from Hacker News
- Stores scraped stories in MongoDB
- Automatically runs when the server starts

### Authentication
- JWT-based authentication
- User registration and login
- Persistent login state using React Context API

### Stories
- Fetch all stories sorted by points
- Fetch single story
- Pagination support
- External story links

### Bookmarks
- Bookmark/unbookmark stories
- Protected bookmarks page

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cheerio

---

## Folder Structure

### Backend

src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
└── services/
Frontend
src/
├── components/
├── context/
├── pages/
├── lib/
└── routes/
Environment Variables
Backend .env
PORT=3000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=10d

CLIENT_URL=http://localhost:5173


## Installation & Setup
Clone the Repository

Backend Setup
cd NewsNest-backend
npm install
npm run dev

Frontend Setup
cd NewsNest-frontend
npm install
npm run dev

API Endpoints

Auth Routes
POST /api/v1/auth/register
POST /api/v1/auth/login
POST/api/v1/auth/logout

Story Routes
GET /api/v1/stories
GET/api/v1/stories/:id
POST /api/v1/stories/:id/bookmark

Bookmark Routes
GET /api/v1/users/bookmarks

Scraper Route
POST /api/v1/scrape
Pagination

Stories API supports pagination:

GET /api/v1/stories?page=1&limit=10
Deployment

Frontend:
Deployed on Vercel

Backend: 
Deployed on Render


Author
Yash Shukla
