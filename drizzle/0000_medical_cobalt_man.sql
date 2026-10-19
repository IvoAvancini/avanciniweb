CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`intent` text NOT NULL,
	`source` text NOT NULL,
	`page` text NOT NULL,
	`created_at` text NOT NULL
);
