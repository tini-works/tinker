CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`expiresAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `approval_history` (
	`id` text PRIMARY KEY NOT NULL,
	`payment_request_id` text NOT NULL,
	`approver_id` text NOT NULL,
	`action` text NOT NULL,
	`comments` text,
	`created_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`payment_request_id`) REFERENCES `payment_requests`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`approver_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `business_process_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`process_index` integer NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` text NOT NULL,
	`status` text NOT NULL,
	`error_code` text,
	`details` text,
	`created_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE TABLE `invoice_payment_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`invoice_id` text NOT NULL,
	`payment_request_id` text NOT NULL,
	`linked_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`payment_request_id`) REFERENCES `payment_requests`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` text PRIMARY KEY NOT NULL,
	`batch_id` text NOT NULL,
	`amount` real NOT NULL,
	`invoice_date` integer NOT NULL,
	`vendor` text NOT NULL,
	`status` text DEFAULT 'imported' NOT NULL,
	`imported_by` text NOT NULL,
	`metadata` text,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`imported_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `payment_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`total_amount` real NOT NULL,
	`request_date` integer NOT NULL,
	`description` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_by` text NOT NULL,
	`current_approver` text,
	`approval_workflow` text,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`current_approver`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`token` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`role` text DEFAULT 'invoice_processor' NOT NULL,
	`emailVerified` integer DEFAULT false,
	`image` text,
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE INDEX `idx_approval_history_payment_request_id` ON `approval_history` (`payment_request_id`);--> statement-breakpoint
CREATE INDEX `idx_approval_history_approver_id` ON `approval_history` (`approver_id`);--> statement-breakpoint
CREATE INDEX `idx_approval_history_action` ON `approval_history` (`action`);--> statement-breakpoint
CREATE INDEX `idx_business_process_logs_process_index` ON `business_process_logs` (`process_index`);--> statement-breakpoint
CREATE INDEX `idx_business_process_logs_entity` ON `business_process_logs` (`entity_type`,`entity_id`);--> statement-breakpoint
CREATE INDEX `idx_business_process_logs_status` ON `business_process_logs` (`status`);--> statement-breakpoint
CREATE INDEX `idx_business_process_logs_error_code` ON `business_process_logs` (`error_code`);--> statement-breakpoint
CREATE INDEX `idx_invoice_payment_requests_invoice` ON `invoice_payment_requests` (`invoice_id`);--> statement-breakpoint
CREATE INDEX `idx_invoice_payment_requests_pr` ON `invoice_payment_requests` (`payment_request_id`);--> statement-breakpoint
CREATE INDEX `idx_invoice_payment_requests_unique` ON `invoice_payment_requests` (`invoice_id`,`payment_request_id`);--> statement-breakpoint
CREATE INDEX `idx_invoices_status` ON `invoices` (`status`);--> statement-breakpoint
CREATE INDEX `idx_invoices_batch_id` ON `invoices` (`batch_id`);--> statement-breakpoint
CREATE INDEX `idx_invoices_imported_by` ON `invoices` (`imported_by`);--> statement-breakpoint
CREATE INDEX `idx_payment_requests_status` ON `payment_requests` (`status`);--> statement-breakpoint
CREATE INDEX `idx_payment_requests_created_by` ON `payment_requests` (`created_by`);--> statement-breakpoint
CREATE INDEX `idx_payment_requests_current_approver` ON `payment_requests` (`current_approver`);--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);