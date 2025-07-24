import { describe, it, expect } from 'vitest';
import app from './index';

describe('Health Check API', () => {
  it('should return health status', async () => {
    const res = await app.request('/health');
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('version', '0.1.0');
    expect(data).toHaveProperty('environment');
  });

  it('should return API info on root path', async () => {
    const res = await app.request('/');
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toHaveProperty('name', 'Tinker Backend API');
    expect(data).toHaveProperty('version', '0.1.0');
    expect(data).toHaveProperty('health', '/health');
  });

  it('should return 404 for unknown routes', async () => {
    const res = await app.request('/unknown-route');
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data).toHaveProperty('error', 'Not Found');
    expect(data).toHaveProperty('path', '/unknown-route');
  });
});
