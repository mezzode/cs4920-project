
-- Users
INSERT INTO users
VALUES
    (DEFAULT, 'jfu', 'foobar');
INSERT INTO users
VALUES
    (DEFAULT, 'user1', 'pass1');
INSERT INTO users
VALUES
    (DEFAULT, 'user2', 'pass2');
INSERT INTO users
VALUES
    (DEFAULT, 'user3', 'pass3');
INSERT INTO users
VALUES
    (DEFAULT, 'user4', 'pass4');

-- Media
INSERT INTO media
VALUES
    (DEFAULT, '12345');
INSERT INTO media
VALUES
    (DEFAULT, '67890');

-- Entry
INSERT INTO entry
VALUES
    (DEFAULT, 1, 1, 'progress', 9);
INSERT INTO entry
VALUES
    (DEFAULT, 2, 1, 'complete', 4);
INSERT INTO entry
VALUES
    (DEFAULT, 1, 2, 'progress', 5);
INSERT INTO entry
VALUES
    (DEFAULT, 2, 3, 'complete', 1);
    
-- SELECT * FROM users;

/*
Commands:
psql __dbname__     - load command line connected to database
\l                  - list databases
\d                  - show tables
\d __tablename__    - table definition
*/
