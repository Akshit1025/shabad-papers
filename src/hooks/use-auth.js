/**
 * @fileOverview A custom React hook to manage and provide Firebase auth state.
 */
'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

/**
 * A hook to get the current authenticated user and loading state.
 * @returns {{user: import('firebase/auth').User | null, loading: boolean}}
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
