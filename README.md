
# TravelApp-GDGoC - Trabook

Tugas Besar Web Development. Membuat aplikasi Travel menggunakan React.js dan Firebase.

## Tech Stack

**Frontend:** React, Vite, TypeScript

**Styling:** ShadCN/UI, TailwindCSS

**Auth:** Firebase Auth

**Backend:** NodeJS, Firebase Firestore

# Setup Project

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

-   [NodeJS](https://nodejs.org/en) Nodejs version 22.x or latest.
-   [pnpm](https://pnpm.io) (Optional) NodeJS package manager, latest.

## Step 1: Clone The Repository

```bash
  git clone https://github.com/Athallahzaki/TravelApp_GDGoC.git
```

## Step 2: Install Required Dependencies

Navigate to project root directory and use npm or pnpm to install the project's dependencies:

```bash
  cd TravelApp_GDGoC

  # If using npm package manager
  npm install

  # If using pnpm package manager
  pnpm install
  pnpm approve-builds
```

## Step 3: Create .env files

In this step you can open your preference code editor or IDE or stick to the terminal.

### linux based

linux bash

```bash
  cp .env.example .env
```

### windows

On windows, there are 2 terminals that have different syntax:

1. windows command prompt

```bash
  cat .env.example > .env
```

2. windows powershell

```bash
  cp .env.example .env
```

### Another way

```
  Or you can copy .env.example manually and rename it to .env
```

## Step 4: Configure Your .env file

Edit the .env file that you copied earlier.

```
  #Firebase Configuration
  VITE_FIREBASE_API_KEY="EXAMPLE-CHANGEME"
  VITE_FIREBASE_AUTH_DOMAIN="EXAMPLE-CHANGEME"
  VITE_FIREBASE_PROJECT_ID="EXAMPLE-CHANGEME"
  VITE_FIREBASE_STORAGE_BUCKET="EXAMPLE-CHANGEME"
  VITE_FIREBASE_MESSAGING_SENDER_ID="EXAMPLE-CHANGEME"
  VITE_FIREBASE_APP_ID="EXAMPLE-CHANGEME"

```

## Step 5: Start the Development Server

Run this code in the terminal to start the development server.

```bash
  # If using npm package manager
  npm run dev

  # If using pnpm package manager
  pnpm dev
```

### Running a Production Build

To deploy the project for production, run this command.

```bash
  # If using npm package manager
  npm run build
  npm run preview

  # If using pnpm package manager
  pnpm build
  pnpm preview
```

## Step 6: Accessing the Server

You can now access the server by opening a browser and going to this site.

```
  http://localhost:5173/ (Landing Page)
  http://localhost:5173/login/ (Login Page)
  http://localhost:5173/dashboard/ (Dashboard Page)
```

## Authors

- Arya Maulana Ibrahim
- Rakendra Aznil
- Muhammad Ridho Firdaus
- Muhammad Zaki At Hallah
