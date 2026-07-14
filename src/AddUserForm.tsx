import { useState } from "react";
import type { User } from "./types.ts";

export function AddUserForm({ onAdd }: { onAdd: (user: User) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // don't reload the page

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName === "" || trimmedEmail === "") {
      setError("Please enter both a name and an email.");
      return;
    }
    if (!trimmedEmail.includes("@")) {
      setError("That email doesn't look right.");
      return;
    }

    const newUser: User = {
      id: Date.now(), // simple unique id for a locally-added user
      name: trimmedName,
      email: trimmedEmail,
      company: { name: "Added by you" },
    };

    onAdd(newUser);
    setName("");
    setEmail("");
    setError(null);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2 className="add-form-title">Add a user</h2>
      <div className="add-form-row">
        <label className="field">
          <span className="field-label">Name</span>
          <input
            className="field-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Lerato Mokoena"
          />
        </label>
        <label className="field">
          <span className="field-label">Email</span>
          <input
            className="field-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. lerato@example.com"
          />
        </label>
      </div>
      {error && <p className="form-error">{error}</p>}
      <button className="btn" type="submit">
        Add user
      </button>
    </form>
  );
}
