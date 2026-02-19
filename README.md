# 📌 Bookmark Manager — Assignment Project

## Overview

This is a full-stack bookmark manager built with modern web technologies. Users can sign in with Google, save bookmarks, view them instantly across tabs, and delete them. Each user only sees their own bookmarks.

## Features

- Google OAuth login only (no email/password)
- Add bookmarks (title + URL)
- Private user data isolation
- Real-time updates across tabs
- Delete bookmarks
- Responsive UI with micro-interactions

## Tech Stack

- **Frontend:** Next.js (App Router), React, TailwindCSS, Motion
- **Backend:** API Routes (Next.js server handlers)
- **Auth & DB:** Supabase
- **HTTP Client:** Axios
- **Realtime:** Supabase Realtime subscriptions

## Authentication Flow

1.  User clicks login
2.  Redirects to Google OAuth
3.  Supabase handles authentication
4.  Session cookies are stored securely
5.  Server routes verify user identity via session

## Database Schema

### bookmarks table

columntypeiduuiduser_iduuidtitletexturltextcreated_attimestamp

Row Level Security (RLS) ensures users only access their own data.

## API Routes

### Create Bookmark

POST /api/bookmark

Body:

Plain `   { "title": "Example", "url": "https://example.com" }   `

### Get Bookmarks

GET /api/bookmark

Returns only logged-in user’s bookmarks sorted newest first.

### Delete Bookmark

DELETE /api/bookmark/\[id\]

Deletes bookmark only if it belongs to the current user.

## Realtime Updates

The dashboard subscribes to database changes:

- INSERT → adds new bookmark instantly
- DELETE → removes bookmark instantly
- UPDATE → updates UI instantly

Works across multiple tabs without refresh.

## Security

- OAuth only authentication
- Server-side session validation
- User ID never trusted from client
- RLS policies enforced in database
- Protected API routes

## Challenges Faced & Solutions

### 1\. Google Authentication Setup

Setting up authentication with Google took significant time because it required configuring OAuth credentials, callback URLs, environment variables, and session handling correctly. Initially authentication failed due to mismatched redirect URLs and missing environment variables. I resolved this by carefully aligning the provider console settings with my app configuration and verifying each variable step by step.

### 2\. Real-Time Updates Across Tabs

Synchronizing bookmark changes across multiple tabs was another complex issue. Insert events worked immediately, but delete events did not reflect. The problem turned out to be related to database permissions and realtime subscription configuration. After enabling realtime for delete events and correcting query conditions, updates started syncing correctly across tabs.

### 3\. API Route Type Errors

During deployment, build errors occurred because the API route handlers did not match the framework’s expected type signatures. The fix was updating route function parameters to use the correct request and context types and adjusting how dynamic route params were accessed.

### 4\. Database Query Issues

At one point delete queries failed even though records existed. The cause was using double quotes instead of single quotes in SQL conditions. Correcting the syntax fixed the issue instantly.

## What I Learned

- Authentication systems require precise configuration and patience.
- Real-time systems depend heavily on backend permissions and event subscriptions.
- Strict typing helps catch mistakes early but requires exact handler signatures.
- Small syntax mistakes in SQL can completely block queries.

## Final Result

Despite multiple roadblocks, I successfully implemented authentication, real-time syncing, CRUD operations, and deployment. The most time-consuming parts were Google authentication setup and syncing data across tabs, but I managed to resolve them all through debugging, documentation, and iterative testing.

## Local Setup

### 1\. Clone repo

Plain `   git clone   cd project   `

### 2\. Install deps

Plain `   npm install   `

### 3\. Environment variables

Create .env.local

Plain `   NEXT_PUBLIC_SUPABASE_URL=your_url  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key   `

### 4\. Run project

Plain `   npm run dev   `

## Design Notes

- UI optimized for mobile → tablet → desktop
- Smooth entry animations
- Feedback toasts for actions
- Clean card layout for bookmarks

## Assignment Requirements Checklist

RequirementStatusGoogle login only✅Add bookmarks✅Private data✅Realtime updates✅Delete bookmarks✅

## Future Improvements

- Edit bookmarks
- Folder organization
- Search + filter
- Drag and drop sorting
- Public share links

## Author

Built as part of a full-stack assignment project.
