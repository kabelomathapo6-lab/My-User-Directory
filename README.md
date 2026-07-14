# User Directory

A small React + TypeScript app that fetches users from an API, lets you search them live,
and add new ones — built to practise **data fetching**, **forms**, and **controlled components**.

## 🔗 Live site
**[ADD YOUR DEPLOYED URL HERE]** — deploy to Vercel/Netlify and paste the link.

## Run locally
```bash
npm install
npm run dev
```

## What it does
- **Fetches** users from `https://jsonplaceholder.typicode.com/users` and shows each one's
  name, email, and company.
- A **controlled search input** filters the list by name as you type — no page refresh.
- Shows **"No users found."** when nothing matches.
- **Bonus:** a form to add a new user (name + email) that appears at the top of the list instantly.

## Where each concept lives
- **Data fetching** → `src/useUsers.ts` (a `useEffect` that runs once and tracks
  loading / error / ready state).
- **Controlled components** → the search box in `src/App.tsx` and both fields in
  `src/AddUserForm.tsx` (their `value` comes from `useState`, `onChange` updates it).
- **Forms** → `src/AddUserForm.tsx` (validates, prevents the default page reload, hands the
  new user up to the parent).

## Stack
Vite · React · TypeScript.
