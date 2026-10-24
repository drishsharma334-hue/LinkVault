# LinkVault — URL Shortener & Analytics

LinkVault is a web application that converts long URLs into short links and tracks how many times each link is clicked.

## Features

- Shorten long URLs
- Redirect short links to their original destinations
- Track click counts for each link
- View a history of created links
- Validate URL input
- Responsive user interface

## Tech Stack

- React
- Vite
- Node.js
- Express.js
- CSS
- Git and GitHub

## Getting Started

### Prerequisites

Install Node.js and npm.

### Run the Backend

Open a terminal and run:

```bash
cd server
npm install
npm run dev
```

The backend runs at http://localhost:5000.

### Run the Frontend

Open a second terminal and run:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite, usually http://localhost:5173.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| POST | `/api/shorten` | Create a short link |
| GET | `/api/links` | View all created links |
| GET | `/api/analytics/:code` | View click analytics |
| GET | `/:code` | Redirect to the original URL |

## Current Limitations

Links and click counts are stored in memory, so they reset when the backend restarts. Persistent database storage can be added in a future version.

## Author

Created as a web development project.