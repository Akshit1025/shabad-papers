/**
 * @fileOverview Provides Firebase anonymous authentication to the application.
 * This component wraps the application and signs in users anonymously on mount.
 */
"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";

/**
 * A provider component that handles Firebase anonymous sign-in.
 * It signs in the user when the component mounts and wraps the children components.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered.
 * @returns {JSX.Element} The provider component.
 */
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
