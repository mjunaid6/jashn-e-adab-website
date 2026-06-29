import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with conflict resolution
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format date for display
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format time for display
 */
export function formatTime(timeString) {
  return timeString;
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Generate a random ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}
