import React, { useContext } from "react";



const useAuth = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  return { user, setUser, loading };
};

export default useAuth;
