"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";

export function FirebaseAuthProvider({ children }) {
  useEffect(() => {
    const signIn = async () => {
      try {
        await signInAnonymously(auth);
        console.log("User signed in anonymously");
      } catch (error) {
        console.error("Anonymous sign-in failed:", error);
      }
    };
    signIn();
  }, []);

  return <>{children}</>;
}
