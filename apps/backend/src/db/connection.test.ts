import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
  db,
  checkDatabaseConnection,
  getDatabaseStats,
  closeDatabaseConnection,
} from './connection';
import { users, invoices, paymentRequests } from './schema';
import { eq } from 'drizzle-orm';

describe('Database Connection', () => {
  beforeAll(async () => {
    // Ensure database connection is working
    expect(checkDatabaseConnection()).toBe(true);
  });

  afterAll(() => {
    closeDatabaseConnection();
  });

  it('should connect to the database successfully', () => {
    expect(checkDatabaseConnection()).toBe(true);
  });

  it('should return database statistics', () => {
    const stats = getDatabaseStats();
    expect(stats).toBeDefined();
    if (stats) {
      expect(typeof stats.users).toBe('number');
      expect(typeof stats.invoices).toBe('number');
      expect(typeof stats.paymentRequests).toBe('number');
    }
  });

  it('should have seeded data', async () => {
    const userCount = await db.select().from(users);
    const invoiceCount = await db.select().from(invoices);
    const paymentRequestCount = await db.select().from(paymentRequests);

    expect(userCount.length).toBeGreaterThan(0);
    expect(invoiceCount.length).toBeGreaterThan(0);
    expect(paymentRequestCount.length).toBeGreaterThan(0);
  });

  it('should be able to query users by role', async () => {
    const adminUsers = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'));
    expect(adminUsers.length).toBeGreaterThan(0);
    expect(adminUsers[0]?.role).toBe('admin');
  });

  it('should be able to query invoices by status', async () => {
    const importedInvoices = await db
      .select()
      .from(invoices)
      .where(eq(invoices.status, 'imported'));
    expect(importedInvoices.length).toBeGreaterThan(0);
    expect(importedInvoices[0]?.status).toBe('imported');
  });

  it('should be able to query payment requests by status', async () => {
    const draftPaymentRequests = await db
      .select()
      .from(paymentRequests)
      .where(eq(paymentRequests.status, 'draft'));
    expect(draftPaymentRequests.length).toBeGreaterThan(0);
    expect(draftPaymentRequests[0]?.status).toBe('draft');
  });

  it('should enforce foreign key constraints', async () => {
    // Try to insert an invoice with a non-existent user
    await expect(
      db.insert(invoices).values({
        batchId: 'TEST-BATCH',
        amount: 100.0,
        invoiceDate: new Date(),
        vendor: 'Test Vendor',
        status: 'imported',
        importedBy: 'non-existent-user-id',
      })
    ).rejects.toThrow();
  });
});
