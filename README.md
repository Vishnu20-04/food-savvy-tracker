
# Welcome to Smart Food Tracker

## Project Overview

Smart Food Tracker is a web application that helps users track food items, their expiration dates, and manage inventory to reduce food waste.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- npm (v9 or later)

## Installation Steps

### 1. Clone the Repository
```sh
git clone <YOUR_GIT_REPOSITORY_URL>
cd smart-food-tracker
```

### 2. Install Dependencies
```sh
npm install
```

This will install the following key dependencies:
- React.js
- React Router
- Tailwind CSS
- Shadcn UI
- QuaggaJS (Barcode Scanning)
- Sonner (Notifications)
- React Hook Form
- Tanstack React Query

### 3. Environment Setup
Create a `.env` file in the project root (if required for future backend integration)
```sh
touch .env
```

### 4. Run the Development Server
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

## Key Features
- Barcode Scanning
- Manual Food Item Entry
- Expiry Tracking Dashboard
- Responsive Mobile Design

## Troubleshooting
- Ensure camera permissions are granted for barcode scanning
- Check browser console for any runtime errors
- Verify Node.js and npm versions meet the prerequisites

## Contributing
Please read the contributing guidelines before making pull requests.
```
