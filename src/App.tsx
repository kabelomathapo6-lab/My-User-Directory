import { useMemo, useState } from "react";
import type { User } from "./types.ts";
import { useUsers } from "./useUsers.ts";
import { AddUserForm } from "./AddUserForm.tsx";
import "./App.css";

export function App() {
  const usersState = useUsers();

  // Users added locally via the form. Kept separate from the fetched
  // list so we can always show them on top.
  const [addedUsers, setAddedUsers] = useState<User[]>([]);

  // The search box is a CONTROLLED COMPONENT: this state is the single
  // source of truth for what's typed in it.
  const [search, setSearch] = useState("");

  // Combine added + fetched, then filter by the search term.
  // useMemo just avoids recomputing on every unrelated re-render.
  const visibleUsers = useMemo(() => {
    const fetched = usersState.status === "ready" ? usersState.data : [];
    const all = [...addedUsers, ...fetched];
    const term = search.trim().toLowerCase();
    if (term === "") return all;
    return all.filter((user) => user.name.toLowerCase().includes(term));
  }, [usersState, addedUsers, search]);

  function handleAdd(user: User) {
    setAddedUsers((prev) => [user, ...prev]);
  }

  return (
    <div className="page">
      <header className="masthead">
        <div className="masthead-inner">
          <h1 className="title">User Directory</h1>
          <p className="subtitle">
            Browse the team, search by name, or add someone new.
          </p>
        </div>
      </header>

      <main className="container">
        <AddUserForm onAdd={handleAdd} />

        {/* Controlled search input */}
        <div className="search-wrap">
          <span className="search-icon" aria-hidden="true">&#8981;</span>
          <input
            className="search-input"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name…"
            aria-label="Search users by name"
          />
        </div>

        {usersState.status === "loading" && (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card card-skeleton" />
            ))}
          </div>
        )}

        {usersState.status === "error" && (
          <div className="notice notice-error">
            <h2>Something went wrong</h2>
            <p>{usersState.message}</p>
          </div>
        )}

        {usersState.status === "ready" && visibleUsers.length === 0 && (
          <div className="notice">
            <h2>No users found.</h2>
            <p>Nobody matches &ldquo;{search}&rdquo;. Try a different name.</p>
          </div>
        )}

        {visibleUsers.length > 0 && (
          <>
            <p className="count">
              {visibleUsers.length} {visibleUsers.length === 1 ? "user" : "users"}
            </p>
            <ul className="grid">
              {visibleUsers.map((user) => (
                <li key={user.id} className="card">
                  <div className="avatar" aria-hidden="true">
                    {user.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <h3 className="card-name">{user.name}</h3>
                  <a className="card-email" href={`mailto:${user.email}`}>
                    {user.email}
                  </a>
                  <p className="card-company">{user.company.name}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>

      <footer className="footer">
        <p>User Directory &middot; React data fetching, forms &amp; controlled components</p>
      </footer>
    </div>
  );
}
