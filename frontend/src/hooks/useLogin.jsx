import { useState } from "react";
import { useAuth } from "./useAuth";

export default function useLogin(url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { login: authLogin } = useAuth();
    const login = async (object) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(object),
        });
        const user = await response.json();
    
        if (!response.ok) {
          setError(user.error);
          setIsLoading(false);
          return error;
        }
    
        authLogin(user);
        setIsLoading(false);
      };

      return { login, isLoading, error };
}