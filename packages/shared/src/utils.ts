// Shared utility functions

/**
 * Format currency amount
 * @param amount - The amount to format
 * @param locale - The locale to use for formatting
 * @param currency - The currency code
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  locale = 'en-US',
  currency = 'USD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format date
 * @param date - Date string or Date object
 * @param locale - The locale to use for formatting
 * @returns Formatted date string
 */
export function formatDate(date: string | Date, locale = 'en-US'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generate a unique ID
 * @returns A unique ID string
 */
export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
