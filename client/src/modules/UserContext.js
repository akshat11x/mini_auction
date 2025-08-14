// UserContext.js - Provides current user info
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('buyer'); // 'buyer' or 'seller'

  return (
    <UserContext.Provider value={{ userId, setUserId, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
