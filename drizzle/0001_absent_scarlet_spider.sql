CREATE TABLE `lexiconTerms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`term` varchar(255) NOT NULL,
	`definition` text NOT NULL,
	`category` varchar(100),
	`relatedTerms` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lexiconTerms_id` PRIMARY KEY(`id`),
	CONSTRAINT `lexiconTerms_term_unique` UNIQUE(`term`)
);
--> statement-breakpoint
CREATE TABLE `moduleCompletion` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` varchar(255) NOT NULL,
	`subModuleId` varchar(255),
	`completed` boolean NOT NULL DEFAULT false,
	`tokensEarned` int NOT NULL DEFAULT 0,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `moduleCompletion_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `readingProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contentType` enum('bible','module') NOT NULL,
	`contentId` varchar(255) NOT NULL,
	`timeSpentSeconds` int NOT NULL DEFAULT 0,
	`completed` boolean NOT NULL DEFAULT false,
	`lastReadAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `readingProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tokenTransactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`amount` int NOT NULL,
	`type` enum('reading','module_completion','discussion') NOT NULL,
	`description` text NOT NULL,
	`relatedContentId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tokenTransactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `tokenBalance` int DEFAULT 0 NOT NULL;