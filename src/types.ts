/* ============================================================
 * Types for the data we get back from the API.
 * The jsonplaceholder /users endpoint returns more fields than we
 * need (address, phone, website...), so we only type the parts we
 * actually use. Typing the response means the compiler catches it
 * if we ever reach for a field that doesn't exist.
 * ============================================================ */

export interface Company {
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  company: Company;
}

/* A loadable models the three real states of a network request:
 * still loading, failed, or done. Using one union (instead of three
 * separate booleans) means we can never be "loading AND error" at once,
 * and every part of the UI is forced to handle each case. */
export type Loadable<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: T };
