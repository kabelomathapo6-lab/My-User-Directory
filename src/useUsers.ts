import { useEffect, useState } from "react";
import type { User, Loadable } from "./types.ts";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export function useUsers(): Loadable<User[]> {
  const [state, setState] = useState<Loadable<User[]>>({ status: "loading" });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data: User[] = await response.json();
        if (active) setState({ status: "ready", data });
      } catch {
        if (active) {
          setState({
            status: "error",
            message: "We couldn't load the users. Please check your connection and try again.",
          });
        }
      }
    }

    load();

    // cleanup: runs if the component unmounts before the fetch resolves
    return () => {
      active = false;
    };
  }, []); // [] = run once, after the first render

  return state;
}
