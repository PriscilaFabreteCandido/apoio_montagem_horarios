import React, { useState } from "react";
import { axiosPrivate } from "../api/axios";


export const UseProvideAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [errors, setErrors] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function signin(username: string, password: string) {
    setIsLoading(true);

    try {
      const response = await axiosPrivate.post("/login", { username, password });
      setUser(response.data.user);
      setIsLoading(false);
    } catch (error: any) {
      setErrors([error.message]); // Handle error appropriately based on your backend response
      setIsLoading(false);
    }
  }

  async function signup(signupData: any) {
    setIsLoading(true);

    try {
      const response = await axiosPrivate.post("/signup", signupData);
      setUser(response.data.user);
      setIsLoading(false);
    } catch (error: any) {
      setErrors([error.message]); // Handle error appropriately based on your backend response
      setIsLoading(false);
    }
  }

  function signout() {
    // Assuming you have a logout endpoint on the server
    axiosPrivate.post("/logout");
    setUser(null);
  }

  return { user, errors, isLoading, signin, signup, signout };
};

export default UseProvideAuth;
