# Firebase + Firestore Setup Guide

## Overview

The app uses **two Firebase services** that work together:

| Service | Purpose | What it stores |
|---|---|---|
| **Firebase Authentication** | Login (email/password) | Email, hashed password, UID |
| **Cloud Firestore** | Authorization (roles, display name) | `role`, `displayName` per user |

---

## Prerequisites

- **Node.js** (v18+)
- **npm** (v9+)
- Access to the [Firebase Console](https://console.firebase.google.com) for project `zd-extr-fe-rbac`

### Installation

```bash
git clone <repo-url>
cd zd-extr-fe
npm install
```

---

## Environment Variables

Create a `.env` file in the project root (this file is gitignored — never commit it):

```env
VITE_USE_FIREBASE=true

VITE_FIREBASE_API_KEY=<your-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-project>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<your-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<your-project>.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
VITE_FIREBASE_APP_ID=<your-app-id>
```

> Ask a team member for the actual values. All values can be found in the [Firebase Console](https://console.firebase.google.com) under **Project Settings** > **General** > **Your apps** > **Config**.

To use mock data instead of the live API, add:
```env
VITE_USE_MOCK_DATA=true
```

### Start the dev server

```bash
npm run dev
```

Open `http://localhost:5173/zd-extr-fe/` in your browser.

---

## How Authentication Works

```
Login form (Login.vue)
    │
    ▼
Firebase Auth ── signInWithEmailAndPassword(email, password)
    │                     │
    │ success             │ fail → show error
    ▼
Auth store (stores/auth.js)
    │
    ▼
Firestore ── reads users/{uid} document
    │
    ▼
Stores: user.displayName, role
    │
    ▼
Dashboard shows "Welcome, {displayName}!"
Route guards can check role via hasRole('admin')
```

### Key files

| File | Responsibility |
|---|---|
| `src/firebase/index.js` | Initializes Firebase app, exports `auth` and `db` instances |
| `src/stores/auth.js` | Pinia store: login, logout, role/user state, `fetchUserData()` from Firestore |
| `src/views/pages/auth/Login.vue` | Login form UI |
| `src/router/index.js` | Route guards — checks `isAuthenticated` before navigation |

---

## Adding a New User

You need to create the user in **two places**:

### Step 1 — Firebase Authentication (handles login)

1. Go to [Firebase Console](https://console.firebase.google.com) → your project → **Authentication** → **Users**
2. Click **"Add user"**
3. Enter email and password
4. Note the generated **User UID**

### Step 2 — Cloud Firestore (handles role & display name)

1. Go to **Firestore** → `users` collection
2. Click **"Add document"**
3. Set the **Document ID** to the exact **User UID** from Step 1 (they must match!)
4. Add fields:

| Field | Type | Example | Required |
|---|---|---|---|
| `role` | string | `"admin"` or `"viewer"` | Yes |
| `displayName` | string | `"John Doe"` | Optional (shown in dashboard greeting) |

> **Important:** The `email` and `password` fields in Firestore are **not used** by the app. Authentication is handled entirely by Firebase Auth. Firestore only stores authorization data (`role`) and profile data (`displayName`).

---

## Auth Store API

```js
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// State
authStore.user              // { uid, email, displayName } or null
authStore.role              // 'admin' | 'viewer' | null
authStore.isAuthenticated   // computed boolean
authStore.isLoading         // true while auth is initializing
authStore.error             // last error message or null

// Actions
authStore.login(email, password)   // returns { success: true }
authStore.logout()                 // clears state, redirects to login

// Role check (use in templates or computed properties)
authStore.hasRole('admin')   // true/false
```