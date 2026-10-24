LinkVault — URL Shortener & Analytics

LinkVault is a web application that converts long URLs into short links and tracks how many times each link is clicked.

Features

* Shorten long URLs
* Redirect short links to original destinations
* Track link click counts
* View link history
* Validate URL input
* Responsive user interface

Tech Stack

* React and Vite
* Node.js and Express.js
* CSS
* Git and GitHub

Getting Started

Backend

Open a terminal:

cd server
npm install
npm run dev

Backend: http://localhost:5000

Frontend

Open a second terminal:

cd client
npm install
npm run dev

Open the local URL displayed by Vite, usually http://localhost:5173.

API Endpoints

* GET / — Check backend status
* POST /api/shorten — Create a short link
* GET /api/links — View link history
* GET /api/analytics/:code — View click analytics
* GET /:code — Redirect to the original URL

Limitations

Links and click counts are stored in memory and reset when the backend restarts.

Author

Created as a web development project.
