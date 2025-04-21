import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const role = Cookies.get("role") || null;
    if (role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) return <div>...</div>;

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  return context;
}
