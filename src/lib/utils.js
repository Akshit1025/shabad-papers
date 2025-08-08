/**
 * @fileOverview Utility functions for the application.
 * Provides a helper function `cn` for conditionally joining class names.
 */
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function to merge Tailwind CSS classes with clsx.
 * @param {...(string|Object|Array)} inputs - The class names to merge.
 * @returns {string} The merged class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
