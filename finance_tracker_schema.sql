-- ============================================
-- PERSONAL FINANCE TRACKER - Database Schema
-- Database: MariaDB / MySQL
-- ============================================


-- 1. USERS
--    Stores registered user accounts
CREATE TABLE users (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)        NOT NULL,
    email       VARCHAR(255)        NOT NULL UNIQUE,
    password    VARCHAR(255)        NOT NULL,          -- store bcrypt hash, never plain text
    created_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- 2. ACCOUNTS
--    A user can have multiple money accounts (e.g. Cash, BDO, GCash)
CREATE TABLE accounts (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     INT UNSIGNED        NOT NULL,
    name        VARCHAR(100)        NOT NULL,           -- e.g. "Cash", "BDO Savings"
    balance     DECIMAL(12, 2)      NOT NULL DEFAULT 0.00,
    created_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_accounts_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);


-- 3. CATEGORIES
--    Labels for transactions — seeded with defaults, users can add their own
CREATE TABLE categories (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     INT UNSIGNED        NULL,               -- NULL = global/default category
    name        VARCHAR(100)        NOT NULL,
    type        ENUM('income', 'expense') NOT NULL,     -- category belongs to one type
    created_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_categories_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);


-- 4. TRANSACTIONS
--    Core table — every income and expense entry lives here
CREATE TABLE transactions (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED            NOT NULL,
    account_id      INT UNSIGNED            NOT NULL,
    category_id     INT UNSIGNED            NOT NULL,
    type            ENUM('income','expense') NOT NULL,
    amount          DECIMAL(12, 2)          NOT NULL CHECK (amount > 0),
    note            VARCHAR(255)            NULL,        -- optional description
    transaction_date DATE                   NOT NULL,    -- when it actually happened
    created_at      TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP               DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_transactions_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_transactions_account
        FOREIGN KEY (account_id) REFERENCES accounts(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_transactions_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE RESTRICT        -- prevent deleting a category that has transactions
);


-- ============================================
-- INDEXES (for query performance)
-- ============================================

-- Speed up fetching all transactions for a user
CREATE INDEX idx_transactions_user_id      ON transactions(user_id);

-- Speed up filtering by date range (monthly summaries)
CREATE INDEX idx_transactions_date         ON transactions(transaction_date);

-- Speed up filtering by type (income vs expense)
CREATE INDEX idx_transactions_type         ON transactions(type);


-- ============================================
-- SEED DATA — Default Global Categories
-- (user_id = NULL means available to everyone)
-- ============================================

INSERT INTO categories (user_id, name, type) VALUES
-- Income categories
(NULL, 'Salary',       'income'),
(NULL, 'Freelance',    'income'),
(NULL, 'Business',     'income'),
(NULL, 'Investment',   'income'),
(NULL, 'Gift',         'income'),
(NULL, 'Other Income', 'income'),

-- Expense categories
(NULL, 'Food',         'expense'),
(NULL, 'Transport',    'expense'),
(NULL, 'Rent',         'expense'),
(NULL, 'Utilities',    'expense'),
(NULL, 'Healthcare',   'expense'),
(NULL, 'Shopping',     'expense'),
(NULL, 'Education',    'expense'),
(NULL, 'Entertainment','expense'),
(NULL, 'Other Expense','expense');
