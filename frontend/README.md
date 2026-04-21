# Job Tracker - Frontend

React frontend for the Job Tracker application. Features job management with search, filters, pagination, and dark mode.

## Live Demo

🔗 [View Live App](https://job-tracker-rupt.vercel.app/)

## Features

- **Job Management:** Add, edit, delete, and view job applications
- **Search:** Real-time search by company name or role
- **Filters:** Filter by application status (Applied, Interview, Offer, Rejected)
- **Pagination:** Browse through jobs 5 at a time
- **Dark Mode:** Toggle between light and dark themes (saves preference)
- **Statistics:** Live counters showing application totals
- **Responsive:** Works on desktop, tablet, and mobile

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool |
| React Router DOM | Navigation |
| Axios | API calls |
| Context API | Theme management |
| LocalStorage | Theme persistence |

## Project Structure

```
frontend/
├── src/
│ ├── components/
│ │ ├── common/ # Button, Modal, ThemeToggle
│ │ ├── JobCard/ # Individual job display
│ │ ├── JobForm/ # Add job form
│ │ ├── EditJobForm/ # Edit job form
│ │ └── StatsCards/ # Statistics dashboard
│ ├── contexts/ # ThemeContext
│ ├── hooks/ # useLocalStorage
│ ├── pages/ # Dashboard, Settings
│ ├── services/ # API configuration
│ └── css/ # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Installation

```bash
cd frontend
npm install
