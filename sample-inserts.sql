-- Users
INSERT INTO users (u_id, first_name, last_name, username, password, balance, u_role) VALUES
(DEFAULT, 'Alice', 'Smith', 'alicesmith', 'password1', 0, 'Admin'),
(DEFAULT, 'John', 'Damme', 'johndamme', 'password2', 400.00, DEFAULT),
(DEFAULT, 'Edith', 'Feint', 'edithfeint', 'password3', 500.00, DEFAULT),
(DEFAULT, 'Kaylor', 'Johnson', 'kaylorjohnson', 'password4', 600.00, DEFAULT);

-- Items
INSERT INTO items (i_id, item_name, sold, owner_id) VALUES
(DEFAULT, 'lotr: box set', FALSE, 2),
(DEFAULT, 'set of steak knives', TRUE, 3),
(DEFAULT, 'maltese falcon', FALSE, 4);


-- Auctions
INSERT INTO auctions (a_id, auction_item_id, bid, bidder_id, status, a_time) VALUES
(DEFAULT, 1, 10.00, 3, 'Active', 60),
(DEFAULT, 2, 20.00, 4, 'InActive', 0),
(DEFAULT, 3, 30.00, 2, 'Active', 180);

-- Commments
INSERT INTO comments (c_id, commenter_id, auction_id, comment)VALUES
(DEFAULT, 1, 1, 'This is a comment by Alice, the admin, on auction item 1'),
(DEFAULT, 2, 2, 'This is a comment by John, a client, on auction item 2'),
(DEFAULT, 3, 3, 'This is a comment by Jane, a client, on auction item 3'),
(DEFAULT, 4, 2, 'This is a comment by Bob, a client, on auction item 2');