import React, { createContext, useState } from "react";
import { User } from "../app/interfaces";

const UserContext = createContext<User | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
