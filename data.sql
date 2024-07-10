DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS auctions;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
	u_id serial PRIMARY KEY,
	first_name varchar(50),
	last_name varchar(50),
	username varchar(50) UNIQUE,
	password varchar(50),
	balance decimal(10, 2),
	u_role varchar(50)
);

CREATE TABLE items(
	i_id serial PRIMARY KEY,
	item_name varchar(50),
	sold boolean DEFAULT FALSE,
	owner_id int REFERENCES users(u_id) ON DELETE SET NULL
);

CREATE TABLE auctions(
	a_id serial PRIMARY KEY,
	item_id int REFERENCES items(i_id) ON DELETE SET NULL,
	bid decimal(10, 2),
	bidder_id int REFERENCES users(u_id) ON DELETE SET NULL,
	status varchar(50) DEFAULT 'Inactive',
	a_time int
);

CREATE TABLE comments(
	c_id serial PRIMARY KEY,
	commenter_id int REFERENCES users(u_id) ON DELETE SET NULL,
	auction_id int REFERENCES auctions(a_id) ON DELETE SET NULL,
	comment varchar(255)
);
