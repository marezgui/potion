import { cn } from './utils';

describe('CSS Class Utility', () => {
  it('combines multiple classes', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    
    expect(result).toContain('text-red-500');
    expect(result).toContain('bg-blue-500');
  });

  it('handles conflicting classes', () => {
    const result = cn('p-4', 'p-8');
    
    expect(result).toBe('p-8');
  });

  it('handles empty and null values', () => {
    const result = cn('text-red-500', null, '', 'bg-blue-500');
    
    expect(result).toContain('text-red-500');
    expect(result).toContain('bg-blue-500');
  });
});
