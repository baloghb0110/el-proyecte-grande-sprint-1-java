drop table if exists accounts cascade;
drop table if exists categories_users_join cascade;
drop table if exists currencies cascade;
drop table if exists external_transactions cascade;
drop table if exists local_transactions cascade;
drop table if exists roles cascade;
drop table if exists transaction_categories cascade;
drop table if exists users cascade;
drop table if exists users_roles_join cascade;


CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE transaction_categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE currencies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(3)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    registered_at TIMESTAMP DEFAULT NOW(),
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    name VARCHAR(255),
    description TEXT,
    currency_id INT REFERENCES currencies(id),
    actual_balance DECIMAL(10, 2),
    savings_balance DECIMAL(10, 2)
);

ALTER TABLE users
ADD COLUMN account_id INT REFERENCES accounts(id);

CREATE TABLE external_transactions(
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    user_id INT REFERENCES users(id),
    category_id INT REFERENCES transaction_categories(id),
    description TEXT,
    date_of_transaction DATE,
    amount DECIMAL(10, 2),
    is_planned BOOLEAN,
    is_recurring BOOLEAN
);

CREATE TABLE local_transactions(
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    user_id INT REFERENCES users(id),
    description TEXT,
    date_of_transaction DATE,
    amount DECIMAL(10, 2),
    is_planned BOOLEAN,
    is_recurring BOOLEAN
);

CREATE TABLE categories_users_join(
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (category_id, user_id),
    FOREIGN KEY (category_id) REFERENCES transaction_categories(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users_roles_join(
    role_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (role_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);


INSERT INTO roles(id, name) VALUES(1, 'ROLE_USER');
INSERT INTO roles(id, name) VALUES(2, 'ROLE_ADMIN');

INSERT INTO transaction_categories (id, name) VALUES (1, 'bills');
INSERT INTO transaction_categories (id, name) VALUES (2, 'grocery shopping');
INSERT INTO transaction_categories (id, name) VALUES (3, 'eating out');
INSERT INTO transaction_categories (id, name) VALUES (4, 'dentist');
INSERT INTO transaction_categories (id, name) VALUES (5, 'income');

INSERT INTO currencies (id, name) VALUES (1, 'huf');
INSERT INTO currencies (id, name) VALUES (2, 'usd');
INSERT INTO currencies (id, name) VALUES (3, 'eur');

INSERT INTO users(id, registered_at, user_name, email, hashed_password) VALUES (1, '01-09-2024', 'Pen Island', 'test@test.net', '$2a$10$pBXmk1FKMWW4ywbMBBVbj.LyvC4uiQpZVJOX2zg.Exc3QmTjifzQO');
INSERT INTO accounts(id, currency_id, savings_balance, actual_balance, description, name) VALUES (1, 1, 0, 79380, 'Test account description', 'Test account');
UPDATE users SET account_id = 1 WHERE id = 1;
UPDATE accounts SET user_id = 1 WHERE id = 1;

INSERT INTO categories_users_join(category_id, user_id) VALUES (1, 1);
INSERT INTO categories_users_join(category_id, user_id) VALUES (2, 1);
INSERT INTO categories_users_join(category_id, user_id) VALUES (3, 1);
INSERT INTO categories_users_join(category_id, user_id) VALUES (4, 1);

INSERT INTO users_roles_join(role_id, user_id) VALUES(1, 1);

INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(1, 1, 1, 3, 'Restaurant', '01-09-2024', -1500, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(2, 1, 1, 3, 'Restaurant - life is good', '01-09-2024', -2500, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(3, 1, 1, 2, 'Lidl shopping', '01-09-2024', -3500, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(4, 1, 1, 1, 'Utility bills', '01-09-2024', -100, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(5, 1, 1, 4, 'Dentist bill', '01-10-2024', -500, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(6, 1, 1, 4, 'Dentist bill', '01-10-2024', -11000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(7, 1, 1, 1, 'utility bills', '01-10-2024', -15000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(8, 1, 1, 1, 'internet bills', '01-10-2024', -12000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(9, 1, 1, 2, 'Spar shopping', '01-11-2024', -500, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(10, 1, 1, 2, 'Lidl shopping', '01-11-2024', -5000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(11, 1, 1, 4, 'bill', '01-11-2024', -4000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(12, 1, 1, 4, 'bill', '01-12-2024', -3500, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(13, 1, 1, 3, 'Gyros take-out', '01-12-2024', -100000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(14, 1, 1, 1, 'bills', '01-12-2024', -2340, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(15, 1, 1, 3, 'Gyros take-out', '01-12-2024', -7800, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(16, 1, 1, 5, 'freelance gig', '01-13-2024', 150000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(17, 1, 1, 5, 'freelance gig', '01-14-2024', 75000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(18, 1, 1, 4, 'bill', '01-13-2024', -7800, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(19, 1, 1, 2, 'Lidl shopping', '01-13-2024', -15000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(20, 1, 1, 4, 'bills', '01-14-2024', -3500, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(21, 1, 1, 3, 'Gyros take-out', '01-15-2024', -100000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(22, 1, 1, 1, 'bills', '01-16-2024', -2340, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(23, 1, 1, 3, 'restaurant', '01-16-2024', -7800, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(24, 1, 1, 5, 'youtube ads', '01-17-2024', 250000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(25, 1, 1, 5, 'freelance gig', '01-18-2024', 45000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(26, 1, 1, 4, 'bills', '01-18-2024', -78000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(27, 1, 1, 2, 'Lidl shopping', '01-19-2024', -25000, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(28, 1, 1, 4, 'gas utility bill', '01-19-2024', -6540, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(29, 1, 1, 2, 'Muller shopping', '01-20-2024', -17600, false, false);
INSERT INTO external_transactions(id, account_id, user_id, category_id, description, date_of_transaction, amount, is_planned, is_recurring) VALUES(30, 1, 1, 4, 'bills', '01-20-2024', -7800, false, false);