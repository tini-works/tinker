import { db } from './connection';
import {
  users,
  invoices,
  paymentRequests,
  invoicePaymentRequests,
  approvalHistory,
  businessProcessLogs,
  BUSINESS_PROCESS_INDEX,
} from './schema';
import { logger } from '../utils/logger';

// Seed data for development and testing
export async function seedDatabase() {
  logger.info('🌱 Starting database seeding...');

  try {
    // Clear existing data (in reverse order of dependencies)
    logger.info('Clearing existing data...');
    await db.delete(businessProcessLogs);
    await db.delete(approvalHistory);
    await db.delete(invoicePaymentRequests);
    await db.delete(paymentRequests);
    await db.delete(invoices);
    await db.delete(users);

    // Seed Users with different roles
    logger.info('Seeding users...');
    const seedUsers = await db
      .insert(users)
      .values([
        {
          id: 'user-admin-001',
          email: 'admin@tinker.com',
          name: 'System Administrator',
          role: 'admin',
          emailVerified: true,
        },
        {
          id: 'user-processor-001',
          email: 'processor@tinker.com',
          name: 'Invoice Processor',
          role: 'invoice_processor',
          emailVerified: true,
        },
        {
          id: 'user-creator-001',
          email: 'creator@tinker.com',
          name: 'Payment Request Creator',
          role: 'payment_request_creator',
          emailVerified: true,
        },
        {
          id: 'user-approver-001',
          email: 'approver1@tinker.com',
          name: 'Senior Approver',
          role: 'approver',
          emailVerified: true,
        },
        {
          id: 'user-approver-002',
          email: 'approver2@tinker.com',
          name: 'Department Approver',
          role: 'approver',
          emailVerified: true,
        },
        {
          id: 'user-finance-001',
          email: 'finance@tinker.com',
          name: 'Finance Officer',
          role: 'finance_officer',
          emailVerified: true,
        },
      ])
      .returning();

    logger.info(`✅ Created ${seedUsers.length} users`);

    // Seed Invoices with different statuses
    logger.info('Seeding invoices...');
    const seedInvoices = await db
      .insert(invoices)
      .values([
        {
          id: 'invoice-001',
          batchId: 'BATCH-2024-001',
          amount: 1250.0,
          invoiceDate: new Date('2024-01-15'),
          vendor: 'Office Supplies Co.',
          status: 'imported',
          importedBy: 'user-processor-001',
          metadata: {
            originalFileName: 'invoices_batch_001.csv',
            lineNumber: 1,
            category: 'office_supplies',
          },
        },
        {
          id: 'invoice-002',
          batchId: 'BATCH-2024-001',
          amount: 850.5,
          invoiceDate: new Date('2024-01-16'),
          vendor: 'Tech Equipment Ltd.',
          status: 'imported',
          importedBy: 'user-processor-001',
          metadata: {
            originalFileName: 'invoices_batch_001.csv',
            lineNumber: 2,
            category: 'equipment',
          },
        },
        {
          id: 'invoice-003',
          batchId: 'BATCH-2024-002',
          amount: 2100.0,
          invoiceDate: new Date('2024-01-20'),
          vendor: 'Software Solutions Inc.',
          status: 'linked',
          importedBy: 'user-processor-001',
          metadata: {
            originalFileName: 'invoices_batch_002.csv',
            lineNumber: 1,
            category: 'software',
          },
        },
        {
          id: 'invoice-004',
          batchId: 'BATCH-2024-002',
          amount: 750.25,
          invoiceDate: new Date('2024-01-22'),
          vendor: 'Consulting Services LLC',
          status: 'linked',
          importedBy: 'user-processor-001',
          metadata: {
            originalFileName: 'invoices_batch_002.csv',
            lineNumber: 2,
            category: 'consulting',
          },
        },
        {
          id: 'invoice-005',
          batchId: 'BATCH-2024-003',
          amount: 500.0,
          invoiceDate: new Date('2024-01-25'),
          vendor: 'Maintenance Co.',
          status: 'completed',
          importedBy: 'user-processor-001',
          metadata: {
            originalFileName: 'invoices_batch_003.csv',
            lineNumber: 1,
            category: 'maintenance',
          },
        },
      ])
      .returning();

    logger.info(`✅ Created ${seedInvoices.length} invoices`);

    // Seed Payment Requests with different statuses
    logger.info('Seeding payment requests...');
    const seedPaymentRequests = await db
      .insert(paymentRequests)
      .values([
        {
          id: 'pr-001',
          totalAmount: 2100.5,
          requestDate: new Date('2024-01-18'),
          description: 'Office supplies and equipment for Q1',
          status: 'draft',
          createdBy: 'user-creator-001',
          approvalWorkflow: {
            stages: [
              { level: 1, approverId: 'user-approver-002', required: true },
              { level: 2, approverId: 'user-approver-001', required: true },
            ],
          },
        },
        {
          id: 'pr-002',
          totalAmount: 2850.25,
          requestDate: new Date('2024-01-23'),
          description: 'Software and consulting services',
          status: 'in_review',
          createdBy: 'user-creator-001',
          currentApprover: 'user-approver-002',
          approvalWorkflow: {
            stages: [
              { level: 1, approverId: 'user-approver-002', required: true },
              { level: 2, approverId: 'user-approver-001', required: true },
            ],
          },
        },
        {
          id: 'pr-003',
          totalAmount: 500.0,
          requestDate: new Date('2024-01-26'),
          description: 'Maintenance services',
          status: 'completed',
          createdBy: 'user-creator-001',
          approvalWorkflow: {
            stages: [
              { level: 1, approverId: 'user-approver-001', required: true },
            ],
          },
        },
      ])
      .returning();

    logger.info(`✅ Created ${seedPaymentRequests.length} payment requests`);

    // Link invoices to payment requests
    logger.info('Linking invoices to payment requests...');
    await db.insert(invoicePaymentRequests).values([
      {
        invoiceId: 'invoice-001',
        paymentRequestId: 'pr-001',
      },
      {
        invoiceId: 'invoice-002',
        paymentRequestId: 'pr-001',
      },
      {
        invoiceId: 'invoice-003',
        paymentRequestId: 'pr-002',
      },
      {
        invoiceId: 'invoice-004',
        paymentRequestId: 'pr-002',
      },
      {
        invoiceId: 'invoice-005',
        paymentRequestId: 'pr-003',
      },
    ]);

    logger.info('✅ Linked invoices to payment requests');

    // Seed Approval History
    logger.info('Seeding approval history...');
    await db.insert(approvalHistory).values([
      {
        paymentRequestId: 'pr-002',
        approverId: 'user-creator-001',
        action: 'submitted',
        comments: 'Initial submission for software and consulting services',
      },
      {
        paymentRequestId: 'pr-003',
        approverId: 'user-creator-001',
        action: 'submitted',
        comments: 'Maintenance services payment request',
      },
      {
        paymentRequestId: 'pr-003',
        approverId: 'user-approver-001',
        action: 'approved',
        comments: 'Approved - maintenance is necessary',
      },
    ]);

    logger.info('✅ Created approval history entries');

    // Seed Business Process Logs
    logger.info('Seeding business process logs...');
    await db.insert(businessProcessLogs).values([
      {
        processIndex: BUSINESS_PROCESS_INDEX.IMPORT_INVOICES,
        entityType: 'invoice',
        entityId: 'invoice-001',
        action: 'import',
        status: 'completed',
        userId: 'user-001',
        metadata: {
          batchId: 'BATCH-2024-001',
          fileName: 'invoices_batch_001.csv',
          processedCount: 2,
        },
      },
      {
        processIndex: BUSINESS_PROCESS_INDEX.IMPORT_INVOICES,
        entityType: 'invoice',
        entityId: 'invoice-002',
        action: 'import',
        status: 'completed',
        userId: 'user-001',
        metadata: {
          batchId: 'BATCH-2024-001',
          fileName: 'invoices_batch_001.csv',
          processedCount: 2,
        },
      },
      {
        processIndex: BUSINESS_PROCESS_INDEX.CREATE_PAYMENT_REQUEST,
        entityType: 'payment_request',
        entityId: 'pr-001',
        action: 'create',
        status: 'completed',
        userId: 'user-002',
        metadata: {
          totalAmount: 2100.5,
          invoiceCount: 2,
        },
      },
      {
        processIndex: BUSINESS_PROCESS_INDEX.LINK_INVOICES_TO_PR,
        entityType: 'payment_request',
        entityId: 'pr-001',
        action: 'link',
        status: 'completed',
        userId: 'user-002',
        metadata: {
          linkedInvoices: ['invoice-001', 'invoice-002'],
        },
      },
      {
        processIndex: BUSINESS_PROCESS_INDEX.SUBMIT_FOR_APPROVAL,
        entityType: 'payment_request',
        entityId: 'pr-002',
        action: 'submit',
        status: 'completed',
        userId: 'user-002',
        metadata: {
          submittedTo: 'user-approver-002',
          workflowStage: 1,
        },
      },
      {
        processIndex: BUSINESS_PROCESS_INDEX.APPROVE_PAYMENT_REQUEST,
        entityType: 'payment_request',
        entityId: 'pr-003',
        action: 'approve',
        status: 'completed',
        userId: 'user-approver-001',
        metadata: {
          approvedBy: 'user-approver-001',
          finalApproval: true,
        },
      },
      {
        processIndex: BUSINESS_PROCESS_INDEX.MARK_AS_COMPLETED,
        entityType: 'payment_request',
        entityId: 'pr-003',
        action: 'complete',
        status: 'completed',
        userId: 'user-finance-001',
        metadata: {
          completedBy: 'user-finance-001',
          paymentMethod: 'bank_transfer',
        },
      },
    ]);

    logger.info('✅ Created business process log entries');

    // Verify seeded data
    const stats = {
      users: await db.select().from(users),
      invoices: await db.select().from(invoices),
      paymentRequests: await db.select().from(paymentRequests),
      approvalHistory: await db.select().from(approvalHistory),
      businessProcessLogs: await db.select().from(businessProcessLogs),
    };

    logger.info('\n📊 Seeding Summary:');
    logger.info(`   Users: ${stats.users.length}`);
    logger.info(`   Invoices: ${stats.invoices.length}`);
    logger.info(`   Payment Requests: ${stats.paymentRequests.length}`);
    logger.info(`   Approval History: ${stats.approvalHistory.length}`);
    logger.info(
      `   Business Process Logs: ${stats.businessProcessLogs.length}`
    );

    logger.info('\n🎉 Database seeding completed successfully!');

    return stats;
  } catch (error) {
    logger.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Function to seed test data (smaller dataset for testing)
export async function seedTestData() {
  logger.info('🧪 Seeding test data...');

  try {
    // Clear existing data
    await db.delete(businessProcessLogs);
    await db.delete(approvalHistory);
    await db.delete(invoicePaymentRequests);
    await db.delete(paymentRequests);
    await db.delete(invoices);
    await db.delete(users);

    // Create minimal test users
    await db.insert(users).values([
      {
        id: 'test-user-001',
        email: 'test@example.com',
        name: 'Test User',
        role: 'admin',
        emailVerified: true,
      },
      {
        id: 'test-approver-001',
        email: 'approver@example.com',
        name: 'Test Approver',
        role: 'approver',
        emailVerified: true,
      },
    ]);

    // Create test invoice
    await db.insert(invoices).values([
      {
        id: 'test-invoice-001',
        batchId: 'TEST-BATCH-001',
        amount: 100.0,
        invoiceDate: new Date(),
        vendor: 'Test Vendor',
        status: 'imported',
        importedBy: 'test-user-001',
      },
    ]);

    // Create test payment request
    await db.insert(paymentRequests).values([
      {
        id: 'test-pr-001',
        totalAmount: 100.0,
        requestDate: new Date(),
        description: 'Test payment request',
        status: 'draft',
        createdBy: 'test-user-001',
      },
    ]);

    logger.info('✅ Test data seeded successfully');
  } catch (error) {
    logger.error('❌ Error seeding test data:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  seedDatabase()
    .then(() => {
      logger.info('Seeding completed');
      process.exit(0);
    })
    .catch(error => {
      logger.error('Seeding failed:', error);
      process.exit(1);
    });
}
