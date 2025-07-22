/**
 * Format a number as currency
 * @param amount The amount to format
 * @param currency The currency code (default: USD)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format a date string
 * @param dateString The date string to format
 * @param format The format to use (default: 'YYYY-MM-DD')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, format = 'YYYY-MM-DD'): string {
  const date = new Date(dateString);
  
  // Simple formatting for now, can be expanded with a library like date-fns
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  } else if (format === 'MM/DD/YYYY') {
    return `${month}/${day}/${year}`;
  } else if (format === 'DD/MM/YYYY') {
    return `${day}/${month}/${year}`;
  }
  
  return `${year}-${month}-${day}`;
}

/**
 * Truncate a string to a specified length
 * @param str The string to truncate
 * @param length The maximum length (default: 50)
 * @returns Truncated string with ellipsis if needed
 */
export function truncateString(str: string, length = 50): string {
  if (str.length <= length) {
    return str;
  }
  
  return str.substring(0, length) + '...';
}

/**
 * Generate a random ID
 * @param prefix Optional prefix for the ID
 * @returns Random ID string
 */
export function generateId(prefix = ''): string {
  const randomPart = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString(36);
  
  return `${prefix}${timestamp}${randomPart}`;
}

