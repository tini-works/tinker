/**
 * Format a currency amount with the specified currency code
 * @param amount The amount to format
 * @param currencyCode The ISO currency code (e.g., USD, EUR)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

/**
 * Format a date string into a localized date string
 * @param dateString The date string to format
 * @param locale The locale to use for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate the number of days until a date
 * @param dateString The target date string
 * @returns Number of days until the date (negative if date is in the past)
 */
export function daysUntil(dateString: string): number {
  const targetDate = new Date(dateString);
  const today = new Date();
  
  // Reset time part for accurate day calculation
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Check if a date is overdue (before today)
 * @param dateString The date string to check
 * @returns True if the date is overdue, false otherwise
 */
export function isOverdue(dateString: string): boolean {
  return daysUntil(dateString) < 0;
}

/**
 * Generate a unique ID
 * @returns A unique ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

