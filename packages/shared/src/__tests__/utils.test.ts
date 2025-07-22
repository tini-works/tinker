import { formatCurrency, formatDate } from '../utils';

describe('formatCurrency', () => {
  it('should format USD currency correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
  });

  it('should format EUR currency correctly', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
  });

  it('should format GBP currency correctly', () => {
    expect(formatCurrency(1234.56, 'GBP')).toBe('£1,234.56');
  });

  it('should handle zero amount', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });

  it('should handle negative amount', () => {
    expect(formatCurrency(-1234.56, 'USD')).toBe('-$1,234.56');
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    expect(formatDate('2023-01-15')).toBe('Jan 15, 2023');
  });

  it('should handle invalid date', () => {
    expect(formatDate('invalid-date')).toBe('Invalid Date');
  });
});

