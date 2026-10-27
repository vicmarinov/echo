# Echo - Functional Guide

A fully functional, deployed version of this application is available at [echo.vicmarinov.workers.dev](https://echo.vicmarinov.workers.dev).

## 1. Project Overview

- **Application Name:** Echo
- **Application Category / Topic:** Microblogging Social Network Service
- **Main Purpose:** Echo is a minimalist social platform designed for sharing posts and engaging in community discussions. It enables users to publish content, interact through comments, and manage their personal profile in a clean, distraction-free environment.

## 2. User Access & Permissions

### Guest (Not Authenticated)

- **Available pages / routes:**
    - Home (`/`)
    - Login (`/login`)
    - Sign Up (`/signup`)
    - Post Details (`/posts/:postId`)
    - Other Users' Profiles (`/:username`)
- **Public data shown:** Feed of all published posts, post details, author information, and post comments (read-only).

### Authenticated User

- **Main sections / pages:**
    - All public pages
    - Create Post (`/posts/create`)
    - Edit Post (`/posts/:postId/edit`)
    - Their Own Profile (`/:theirOwnUsername`)
- **Details pages:** Full view of post content with an interactive form to add comments, plus edit and delete controls if the user is the post author.
- **Create, Edit and Delete Actions:** Can create new posts, add comments to any post, and edit or delete **only their own** posts.


## 3. Authentication & Session Handling

### Authentication Flow

1. **On app load:** `CurrentProfileProvider` initializes and checks for an active Supabase session.
2. **Status check:** Verified asynchronously via Supabase Auth.
3. **On Login / Registration:** User credentials are submitted via `auth-service.ts`, the global `CurrentProfileContext` updates with the user's profile, and the user is redirected to the home feed (`/`).
4. **On Logout:** Session is cleared via Supabase and `CurrentProfileContext` resets to `null`.

### Session Persistence

- **Storage:** Managed by Supabase Auth through the Supabase SDK (persisted in `localStorage`) and shared in-memory via `CurrentProfileContext`.
- **Auto-login on refresh:** On page reload, Supabase SDK retrieves the token from `localStorage` and `CurrentProfileProvider` automatically fetches and restores the user's profile state.

## 4. Routing Structure

### Route Guards Logic

**`ProtectedRoute.tsx`** restricts access based on authentication state. Unauthenticated users trying to access private routes (Create or Edit) are redirected to `/login`. Authenticated users trying to access `/login` or `/signup` are redirected to `/`.

### Main Routes

1. `/` – Public catalog of posts.
2. `/login` – Guest-only login form.
3. `/signup` – Guest-only registration form.
4. `/posts/create` – Private route for creating a post.
5. `/posts/:postId` – Public details & comment section.
6. `/posts/:postId/edit` – Private route for post owners.
7. `/:username` – User profile and their published posts.

### Layout & Parameterized Routes

- **Layout:** Wrapped in a global layout with a persistent `Header` component in the `App` component.
- **Parameterized Routes:** `/posts/:postId`, `/posts/:postId/edit`, and `/:username`.

## 5. List → Details Flow

### Catalog / List Page

- **Data displayed:** List of post cards (`AllPosts.tsx` / `Post.tsx`) showing post text and author details (`Author.tsx`).
- **User interaction:** Users can browse the chronological feed, click on an author to view their profile, or select a post to read and comment.

### Details Page

- **Navigation trigger:** Clicking a post card triggers navigation via React Router's or `useNavigate` to `/posts/:postId`.
- **Route parameters:** Extracts `:postId` via `useParams()` to fetch the specific post and its associated comments.

## 6. Data Source & Backend

- **Backend Type:** Real Backend-as-a-Service (**Supabase** – PostgreSQL database + Supabase Auth).

## 7. Data Operations (CRUD)

- **Create:** Authenticated users submit the `CreatePost` or `AddComment` form, calling `postService.create()` or `commentService.create()` to insert records into Supabase.
- **Read:** Fetched on component mount in `AllPosts`, `PostDetails`, `Profile`, and `CommentSection` using `post-service.ts`, `comment-service.ts` and `auth-service.ts`.
- **Update:** Post authors edit records via `EditPost.tsx` (`postService.update()`). Upon success, the user is navigated back to the updated `/posts/:postId` view.
- **Delete:** Authors trigger deletion on `PostDetails` component. Post deletion redirects to `/`.

## 8. Forms & Validation

### Forms Used

1. **Login Form** (`Login.tsx`)
2. **Signup Form** (`Signup.tsx`)
3. **Create Post Form** (`CreatePost.tsx`)
4. **Edit Post Form** (`EditPost.tsx`)
5. **Add Comment Form** (`AddComment.tsx`)

### Validation Rules

Validation is schema-based via `*.schema.ts` with `@zod/mini` and the custom `useControlledForm` hook.

Examples:
1. **`email` in login and signup forms:** required, must match a valid email format.
2. **`text` in post and comment creation forms:** required, maximum character length constraint.
3. **`password` in the signup form:** required, minimum length requirement, character format validation.

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

- **Standard Hooks:** `useState`, `useEffect`, `useContext`, `useReducer`, `useParams`, `useNavigate`.
- **Custom Hooks:** `useControlledForm` for form state & validation, `useCurrentProfile` and `useComments` for accessing context.
- **Lifecycle Example:** `PostDetails` fetches post data on **mount** via `useEffect`, re-fetches if the `:postId` parameter **updates**, and aborts the fetching on **unmount**.

### Context API

- **`CurrentProfileContext`:** Shares the authenticated user's profile across `Header`, `ProtectedRoute`, `PostDetails`, and `AddComment`.
- **`CommentsContext`:** Manages the state and actions (via reducer) for the comment list inside `PostDetails`, consumed by `CommentSection`, `AddComment`, and `Comment`.

### Component Styling

Component styling is maintained through **CSS Modules** (`*.module.css`) combined with several global CSS stylesheets (`variables.css`, `global.css`, `form.module.css`) for scoped and modular styling.

## 10. Typical User Flow

1. **Register / Log In:** A guest visits the site, navigates to `/signup` or `/login`, and authenticates.
2. **Browse Feed:** Redirected to `/`, the user scrolls through recent community posts.
3. **Engage:** The user clicks a post to view `/posts/:postId` and submits a comment via `AddComment`.
4. **Publish & Manage:** The user creates a new post at `/posts/create`, views it on their own profile (`/profile/:username`), and edits or deletes it as needed.

## 11. Error & Edge Case Handling

- **Authentication Errors:** Invalid login/signup credentials or unauthorized route attempts display inline error messages and trigger route guard redirects.
- **Network / Data Errors:** `try/catch` blocks around Supabase service calls capture API errors and display user-friendly error alerts.
- **Empty / Missing States:** Displays fallback messages when a feed, profile, or comment section has no items, or when a requested post ID does not exist.

---

## 🚀 Quick Start (Local Setup)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (.env)
SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_KEY="your-publishable-key"

# 3. Run development server
npm run dev
```