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
